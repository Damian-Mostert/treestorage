module.exports = function(path,rules){
  let fs = require("fs");
  function FIND_ALG(ARRAY,INPUT,RULES){
    let all = ARRAY
    let input = INPUT
    let rules = RULES
    for(let ruleName in rules){
      if(typeof rules[ruleName] == "object"){
          if(rules[ruleName].private == true){
            if(input[ruleName]){input[ruleName]=undefined}
          }
      }
    }
    let results = []
    function sub_scan(all,input){
        let push = false;
      for(let i in all){
        for(let n in input){
          if(typeof input[n] == "number"){
            if(all[i][n] == input[n]){
              push = true;
            }
          }else if(typeof input[n] == "string"){
            if(typeof all[i][n] == "string"){
              let A = all[i][n];
              let B = input[n];
              if(A==B){
                push = true;
              }
            }
          }else if(typeof input[n] == "object"){
            if(typeof all[i][n] == "object"){
              push = sub_scan(all[i],input[n])
            }
          }
        }
      }
      if(push){
        return true;
      }
    }
    function scan(all,input){
        for(let i in all){
          let push = false;
          for(let n in input){
            if(typeof input[n] == "number"){
              if(all[i][n] == input[n]){
                push = true;
              }
            }else if(typeof input[n] == "string"){
              if(typeof all[i][n] == "string"){
                let A = all[i][n];
                let B = input[n];
                if(A==B){
                  push = true;
                }
              }
            }else if(typeof input[n] == "object"){
              if(typeof all[i][n] == "object"){
                push = sub_scan(all[i],input[n])
              }
            }
          }
        if(push){
          results.push(all[i])
        }
      }
    }
    scan(all,input)
    return results
  }
  function SEARCH_ALG(ARRAY,INPUT,RULES){
    let all = ARRAY
    let input = INPUT
    let rules = RULES
    for(let ruleName in rules){
      if(typeof rules[ruleName] == "object"){
          if(rules[ruleName].private == true){
            if(input[ruleName]){input[ruleName]=undefined}
          }
      }
    }
    let results = []
    function sub_scan(all,input){
        let push = false;
      for(let i in all){
        for(let n in input){
          if(typeof input[n] == "number"){
            if(all[i][n] == input[n]){
              push = true;
            }
          }else if(typeof input[n] == "string"){
            if(typeof all[i][n] == "string"){
              let A = all[i][n].toLowerCase();
              let B = input[n].toLowerCase();
              if(A.startsWith(B)){
                push = true;
              }
            }
          }else if(typeof input[n] == "object"){
            if(typeof all[i][n] == "object"){
              push = sub_scan(all[i],input[n])
            }
          }
        }
      }
      if(push){
        return true;
      }
    }
    function scan(all,input){
        for(let i in all){
          let push = false;
          for(let n in input){
            if(typeof input[n] == "number"){
              if(all[i][n] == input[n]){
                push = true;
              }
            }else if(typeof input[n] == "string"){
              if(typeof all[i][n] == "string"){
                let A = all[i][n].toLowerCase();
                let B = input[n].toLowerCase();
                if(A.startsWith(B)){
                  push = true;
                }
              }
            }else if(typeof input[n] == "object"){
              if(typeof all[i][n] == "object"){
                push = sub_scan(all[i],input[n])
              }
            }
          }
        if(push){
          results.push(all[i])
        }
      }
    }
    scan(all,input)
    return results
  }
  function ADD_SEARCH_FIND_DELETE(results){
    let originalResults  = results
    if(results.length > 0){
      results.find = function(INPUT,CALLBACK){
        let results2 = FIND_ALG(results,INPUT)
        ADD_SEARCH_FIND_DELETE(results2)
        if(typeof CALLBACK == "function"){CALLBACK(results2)}
        return results2
      }
      results.search = function(INPUT,CALLBACK){
        let results2 = SEARCH_ALG(results,INPUT)
        ADD_SEARCH_FIND_DELETE(results2)
        if(typeof CALLBACK == "function"){CALLBACK(results2)}
        return results2
      }
      results.findOne = function(INPUT,CALLBACK){
        let results2 = results.find(INPUT)[0]
        if(typeof CALLBACK == "function"){CALLBACK(results2)}
        return results2
      }
      results.searchOne = function(INPUT,CALLBACK){
        let results2 = results.search(INPUT)[0]
        if(typeof CALLBACK == "function"){CALLBACK(results2)}
        return results2
      }
      results.update = function(INPUT,INPUT2,CALLBACK){
        let S = {}
        let results2 = results.findOne(INPUT)
        if(!results2){S.error = "no item found"}else{S = results2.update(INPUT2)}
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.updateAll = function(INPUT,CALLBACK){
        let S = []
        for(let i in results){
          if(typeof results[i] == "object"){
            S[i] = results[i].update(INPUT)
          }
        }
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.updateById = function(INPUT,INPUT2,CALLBACK){
        let S = {}
        let results2 = results.findOne({__id:INPUT})
        if(!results2){S.error = "no item found"}else{S = results2.update(INPUT2)}
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.updateMult = function(INPUT,INPUT2,CALLBACK){
        let results2 = results.find(INPUT)
        let S = []
        for(let i in results2){
          if(typeof results2[i] == "object"){
            S[i] = results2[i].update(INPUT2)
          }
        }
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.searchUpdate = function(INPUT,INPUT2,CALLBACK){
        let results2 = results.search(INPUT)
        let S = []
        for(let i in results2){
          if(typeof results2[i] == "object"){
            S[i] = results2[i].update(INPUT2)
          }
        }
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.searchOneUpdate = function(INPUT,INPUT2,CALLBACK){
        let S = {}
        let results2 = results.searchOne(INPUT)
        if(!results2){S.error = "no item found"}else{S = results2.update(INPUT2)}
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.searchDelete = function(INPUT,CALLBACK){
        let results2 = results.search(INPUT)
        let S = []
        for(let i in results2){
          if(typeof results2[i] == "object"){
            S[i] = results2[i].delete()
          }
        }
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.searchOneDelete = function(INPUT,CALLBACK){
        let S = {}
        let results2 = results.searchOne(INPUT)
        if(!results2){S.error = "no item found"}else{S = results2.delete()}
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.delete = function(INPUT,CALLBACK){
        let S = {}
        let results2 = results.findOne(INPUT)
        if(!results2){S.error = "no item found"}else{S = results2.delete()}
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.deleteById = function(INPUT,CALLBACK){
        let S = {}
        let results2 = results.findOne({__id:INPUT})
        if(!results2){S.error = "no item found"}else{S = results2.delete()}
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.deleteMult = function(INPUT,CALLBACK){
        let results2 = results.find(INPUT)
        let S = []
        for(let i in results2){
          if(typeof results2[i] == "object"){
            S[i] = results2[i].delete()
          }
        }
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
      results.deleteAll = function(CALLBACK){
        let S = []
        for(let i in results){
          if(typeof results[i] == "object"){
            S[i] = results[i].delete()
          }
        }
        if(typeof CALLBACK == "function"){CALLBACK(S)}
        return S
      }
    }
  }
  if(typeof rules == "object"){
    if(rules.length == 0){
      throw new Error("object has no rules")
    }
    for(let object in rules){
      if(typeof rules[object] == "object"){
        let rule_list = rules[object];
        if((object == "__v")||(object == "__id")||(object == "__dir")||(object == "__time_of_make")||(object == "update")||(object == "delete")||(object == "change")){throw new Error(`${object} can not be used as database key word, as it is generated staticly`)}
          for(let rule in rule_list){
            if(!(rule == "__on" || rule == "require"||rule == "unique"||rule == "call"||rule == "overide"||rule == "private"||rule == "type"||rule == "match"||rule == "size"||rule == "defualt"||rule == "minSize"||rule == "maxSize"||rule == "upperCase"||rule == "lowerCase"||rule == "solid")){throw new Error(`${rule} is in invalid config option`)}
            if(rule == "type"){if(!((rule_list[rule] == String)||(rule_list[rule] == Array)||(rule_list[rule] == Object)||(rule_list[rule] == Date)||(rule_list[rule] == Number)||(rule_list[rule] == Boolean)||(rule_list[rule] == Function))){throw new Error(`${rule_list[rule]} in ${rule} is in invalid config option type`)}}
            if(rule == "__on"){if(!((typeof rule_list[rule] == "object"))){throw new Error(`${rule_list[rule]} in ${rule} is not a object`)}}
          }
      }else{throw new Error(object+" in object has no rules")}
    }
  }else{throw new Error("object has no rules")}
  if(!fs.existsSync(path)){fs.mkdirSync(path)}
  let getAll = function(callback){
    let results = []
    let main = function(){return fs.readdirSync(path).filter(function (file) {return fs.statSync(path+'/'+file).isFile();});}().forEach((item, i) => {let data = fs.readFileSync(path+'/'+item).toString();try{let chuck = JSON.parse(data);results.push(chuck)}catch(e){}});
    for(let res in results){
      for(let i in results[res]){
        if(rules[i]){
        if(rules[i].type == Function){
          function evalFunction(str){
            let StringFunction = results[res][i]
            try{eval(`StringFunction = ${str}`)}catch(e){}
            return StringFunction
          }
          results[res][i] = evalFunction(results[res][i])
        }
        if(rules[i].type == Date){
          results[res][i] = new Date(results[res][i])
        }
        }
      }
    }
    for(let i in results){
      for(let h in results[i].__time_of_make){
        results[i].__time_of_make[h] = new Date(results[i].__time_of_make[h])
      }
      results[i].delete=function(callback){
        let res = deleteOne({__id:results[i].__id})
        if(typeof callback == "function"){callback(res)}
        return res
      }
      results[i].update=function(newData,callback){
        let res = update({id:results[i].__id},newData)
        if(typeof callback == "function"){callback(res)}
        return res
      }
      results[i].change = results[i].update
    }
    ADD_SEARCH_FIND_DELETE(results)
    if(typeof callback == "function"){callback(results)};return results
  }
  let create = function(input,callback){
    if(!(typeof input == "object")){throw new Error("hydra.db create requires object")}
    if(input.__v){throw new Error("cant set __v as it is used as a static variabal")}
    if(input.__id){throw new Error("cant set __id as it is used as a static variabal")}
    if(input.__dir){throw new Error("cant set __dir as it is used as a static variabal")}
    if(input.__time_of_make){throw new Error("cant set __time_of_make as it is used as a static variabal")}
    if(input.update){throw new Error("cant set update as it is used as a static function")}
    if(input.delete){throw new Error("cant set delete as it is used as a static function")}
    if(input.change){throw new Error("cant set change as it is used as a static function")}
    function PROCEED(){
      let NEW_OBJECT = {}
      for(let i in input){
        if(typeof rules == "object"){
          for(let subName in rules){
            if(i == subName){
              NEW_OBJECT[i] = input[i]
            }
          }
        }else{
          NEW_OBJECT[i] = input[i]
        }
      }
      function generateNewId(){
      function makeId(length){var result = '';var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';var charactersLength = characters.length;for ( var i = 0; i < length; i++ ) {result += characters.charAt(Math.floor(Math.random() * charactersLength));}return result;}
      let thisID = makeId(75);
      let all = getAll();
      let ok = true;
      for(let i in all){
        if(thisID == all[i].__id){
          ok = false;
        }
      }
      if(ok){
        return thisID;
      }else{
        return generateNewId();
      }
    }
      let ID = generateNewId()
      NEW_OBJECT.__v = 0
      NEW_OBJECT.__id = ID;
      NEW_OBJECT.__time_of_make = [new Date()]
      let dir = path+"/"+ID
      NEW_OBJECT.__dir = dir
      let fileData = JSON.stringify(NEW_OBJECT)
      fs.writeFileSync(dir,fileData)
    }
    let results = {errors:[]}
    if(typeof rules == "object"){
      let ok = true;
      for(let ruleName in rules){
        if(typeof rules[ruleName] == "object"){
          if(rules[ruleName].defualt&&(!input[ruleName])){
            input[ruleName] = rules[ruleName].defualt
            }
            if(rules[ruleName].overide){
              input[ruleName] = rules[ruleName].overide
            }
            if(typeof rules[ruleName].call == "function"){
              if(typeof input[ruleName] == "function"){
                input[ruleName] = input[ruleName] (rules[ruleName].call(input))
              }
            }
            if(rules[ruleName].call){
              if(typeof input[ruleName] == "function"){
                input[ruleName] = input[ruleName] (rules[ruleName].call)
              }
            }
          if(rules[ruleName].lowerCase&&input[ruleName]){
            if(typeof input[ruleName] == "string"){
            let S = input[ruleName].toLowerCase()
            input[ruleName] = S
            }
          }
          if(rules[ruleName].upperCase&&input[ruleName]){
            if(typeof input[ruleName] == "string"){
            let S = input[ruleName].toUpperCase()
            input[ruleName] = S
            }
          }
          if(rules[ruleName].size&&input[ruleName]){
            if(typeof input[ruleName] == "number"){
              if(!(input[ruleName] == rules[ruleName].size)){
                results.errors.push(`${ruleName} is  not ${rules[ruleName].size}`)
                ok = false;
              }
            }else{
              if(!(input[ruleName].length == rules[ruleName].size)){
                results.errors.push(`${ruleName} is  not ${rules[ruleName].size}`)
                ok = false;
              }
            }
          }
          if(rules[ruleName].maxSize&&input[ruleName]){
            if(typeof input[ruleName] == "number"){
              if((input[ruleName] > rules[ruleName].maxSize)){
                results.errors.push(`${ruleName} is bigger than ${rules[ruleName].maxSize}`)
                ok = false;
              }
            }else{
              if((input[ruleName].length > rules[ruleName].maxSize)){
                results.errors.push(`${ruleName} is length bigger than ${rules[ruleName].maxSize}`)
                ok = false;
              }
            }
          }
          if(rules[ruleName].minSize&&input[ruleName]){
            if(typeof input[ruleName] == "number"){
              if((input[ruleName] < rules[ruleName].minSize)){
                  results.errors.push(`${ruleName} is smaller than ${rules[ruleName].minSize}`)
                ok = false;
              }
            }else{
              if((input[ruleName].length < rules[ruleName].minSize)){
                results.errors.push(`${ruleName} is length smaller than ${rules[ruleName].minSize}`)
                ok = false;
              }
            }
          }
          if(rules[ruleName].require==true){
            if(!(input[ruleName])){
              ok = false;
              results.errors.push(`missing ${ruleName}`)
            }
          }
          if(rules[ruleName].type&&input[ruleName]){
            if(rules[ruleName].type==Number){
            if(!(typeof input[ruleName] == "number")){
              ok = false;
              results.errors.push(`${ruleName} must be boolean`)
            }
          }
          if(rules[ruleName].type==Function){
          if(!(typeof input[ruleName] == "function")){
              ok = false;
              results.errors.push(`${ruleName} must be function`)
            }else{
              input[ruleName] = input[ruleName].toString()
            }
          }
          if(rules[ruleName].type==Boolean){
          if(!(typeof input[ruleName] == "boolean")){
            ok = false;
            results.errors.push(`${ruleName} must be number`)
          }
        }
        if(rules[ruleName].type==Date){
          var isDate = function(date) {
            return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
          }
          if (isDate(input[ruleName])) {
          }else{
            ok = false;
            results.errors.push(`${ruleName} must be Date`)
          }
        }

            if(rules[ruleName].type==String){
            if(!(typeof input[ruleName] == "string")){
              ok = false;
              results.errors.push(`${ruleName} must be String`)
            }
          }
            if(rules[ruleName].type==Array){
            if(! Array.isArray(input[ruleName]) ){
              ok = false;
              results.errors.push(`${ruleName} must be Array`)
            }
          }
            if(rules[ruleName].type==Object){
            if(!(typeof input[ruleName] == "object")){
              ok = false;
              results.errors.push(`${ruleName} must be Object`)
            }
          }
        }
          if(rules[ruleName].match&&input[ruleName]){
            if(typeof input[ruleName] == "string"){
              if(!(input[ruleName].match(rules[ruleName]))){
                results.errors.push(`${ruleName} does not match`)
                ok = false;
              }
            }else{
              results.errors.push(`${ruleName} is not a string so can not match`)
              ok = false;
            }
          }
          if(rules[ruleName].unique&&input[ruleName]){
            let all = getAll()
            for(let i in all){
              if(all[i][ruleName] == input[ruleName]){
                results.errors.push(`${ruleName} is taken`)
                ok = false;
              }
            }
          }
        }
      }
      if(ok){
        PROCEED();results.success = "item made"
      }
    }else{
      PROCEED();results.success = "item made"
    }
    if(results.errors.length>0){results.error=true}
    if(typeof callback == "function"){callback(results)};return results
  }
  let find = function(input,callback){
    let results = FIND_ALG(getAll(),input,rules)
    ADD_SEARCH_FIND_DELETE(results)
    if(typeof callback == "function"){callback(results)};return results
  }
  let findOne = function(input,callback){
    let results = find(input)[0];
    if(typeof callback == "function"){callback(results)};return results
  }
  let findById = function(input,callback){
    let results = findOne({__id:input});
    if(typeof callback == "function"){callback(results)};return results
  }
  let search = function(input,callback){
    let results = SEARCH_ALG(getAll(),input,rules)
    ADD_SEARCH_FIND_DELETE(results)
    if(typeof callback == "function"){callback(results)};return results
  }
  let searchOne = function(input,callback){
    let results = search(input)[0];
    if(typeof callback == "function"){callback(results)};return results
  }
  let searchById = function(input,callback){
    let results = searchOne({id:input});
    if(typeof callback == "function"){callback(results)};return results
  }
  let update = function(findFilter,input,callback){
    if(!(typeof input == "object")){throw new Error("update requires object")}
    if(input.__v){throw new Error("cant set __v as it is used as a static variabal")}
    if(input.__id){throw new Error("cant set __id as it is used as a static variabal")}
    if(input.__dir){throw new Error("cant set __dir as it is used as a static variabal")}
    if(input.update){throw new Error("cant set update as it is used as a static function")}
    if(input.delete){throw new Error("cant set delete as it is used as a static function")}
    let results={errors:[]}
    let ITEM = findOne(findFilter)
    if(ITEM){
    function PROCEED(){
      ITEM.__v ++;
      ITEM.__time_of_make.push(new Date())
      let NEW_OBJECT = {}
      for(let i in input){
        if(typeof rules == "object"){
          for(let subName in rules){
            if(i == subName){
              NEW_OBJECT[i] = input[i]
            }
          }
        }else{
          NEW_OBJECT[i] = input[i]
        }
      }
      for(let I in ITEM){
        if(NEW_OBJECT[I]){
          ITEM[I] = NEW_OBJECT[I]
        }
      }
      let FILE_DATA = JSON.stringify(ITEM)
      fs.writeFileSync(ITEM.__dir,FILE_DATA)
    }
    if(typeof rules == "object"){
      let ok = true;
      for(let ruleName in rules){
        if(typeof rules[ruleName] == "object"){
          if(rules[ruleName].overide){
            input[ruleName] = rules[ruleName].overide
          }
          if(typeof rules[ruleName].call == "function"){
            if(typeof input[ruleName] == "function"){
              input[ruleName] = input[ruleName] (rules[ruleName].call(input))
            }
          }
          if(rules[ruleName].call){
            if(typeof input[ruleName] == "function"){
              input[ruleName] = input[ruleName] (rules[ruleName].call)
            }
          }
          if(rules[ruleName].lowerCase&&input[ruleName]){
            if(typeof input[ruleName] == "string"){
            let S = input[ruleName].toLowerCase()
            input[ruleName] = S
            }
          }
          if(rules[ruleName].upperCase&&input[ruleName]){
            if(typeof input[ruleName] == "string"){
            let S = input[ruleName].toUpperCase()
            input[ruleName] = S
            }
          }
          if(rules[ruleName].size&&input[ruleName]){
            if(typeof input[ruleName] == "number"){
              if(!(input[ruleName] == rules[ruleName].size)){
                results.errors.push(`${ruleName} is  not ${rules[ruleName].size}`)
                ok = false;
              }
            }else{
              if(!(input[ruleName].length == rules[ruleName].size)){
                results.errors.push(`${ruleName} is  not ${rules[ruleName].size}`)
                ok = false;
              }
            }
          }
          if(rules[ruleName].solid == true&&input[ruleName]){
            results.errors.push(`${ruleName} canot be updated`)
            ok = false;
          }
          if(rules[ruleName].maxSize&&input[ruleName]){
            if(typeof input[ruleName] == "number"){
              if((input[ruleName] > rules[ruleName].maxSize)){
                results.errors.push(`${ruleName} is bigger than ${rules[ruleName].maxSize}`)
                ok = false;
              }
            }else{
              if((input[ruleName].length > rules[ruleName].maxSize)){
                results.errors.push(`${ruleName} is length bigger than ${rules[ruleName].maxSize}`)
                ok = false;
              }
            }
          }
          if(rules[ruleName].minSize&&input[ruleName]){
            if(typeof input[ruleName] == "number"){
              if((input[ruleName] < rules[ruleName].minSize)){
                  results.errors.push(`${ruleName} is smaller than ${rules[ruleName].minSize}`)
                ok = false;
              }
            }else{
              if((input[ruleName].length < rules[ruleName].minSize)){
                results.errors.push(`${ruleName} is length smaller than ${rules[ruleName].minSize}`)
                ok = false;
              }
            }
          }
          if(rules[ruleName].type&&input[ruleName]){
            if(rules[ruleName].type==Boolean){
            if(!(typeof input[ruleName] == "boolean")){
              ok = false;
              results.errors.push(`${ruleName} must be boolean`)
            }
            }

            if(rules[ruleName].type==Number){
            if(!(typeof input[ruleName] == "number")){
              ok = false;
              results.errors.push(`${ruleName} must be number`)
            }
          }
          if(rules[ruleName].type==Date){
            var isDate = function(date) {
              return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
            }
            if (isDate(input[ruleName])) {
            }else{
              ok = false;
              results.errors.push(`${ruleName} must be Date`)
            }
          }
            if(rules[ruleName].type==String){
            if(!(typeof input[ruleName] == "string")){
              ok = false;
              results.errors.push(`${ruleName} must be String`)
            }
          }
            if(rules[ruleName].type==Array){
            if(! Array.isArray(input[ruleName]) ){
              ok = false;
              results.errors.push(`${ruleName} must be Array`)
            }
          }
            if(rules[ruleName].type==Object){
            if(!(typeof input[ruleName] == "object")){
              ok = false;
              results.errors.push(`${ruleName} must be Object`)
            }
          }
        }
          if(rules[ruleName].match&&input[ruleName]){
            if(typeof input[ruleName] == "string"){
              if(!(input[ruleName].match(rules[ruleName]))){
                results.errors.push(`${ruleName} does not match`)
                ok = false;
              }
            }else{
              results.errors.push(`${ruleName} is not a string so can not match`)
              ok = false;
            }
          }
          if(rules[ruleName].unique&&input[ruleName]){
            let all = getAll()
            for(let i in all){
              if(all[i][ruleName] == input[ruleName]){
                results.errors.push(`${ruleName} is taken`)
                ok = false;
              }
            }
          }
        }
      }
      if(ok){
        PROCEED();results.success = "item updated"
      }
    }else{
      PROCEED();results.success = "item updated"
    }
  }else{
    results.errors.push("no item found")
  }
      if(results.errors.length>0){results.error=true}
    if(typeof callback == "function"){callback(results)}
    return results
  }
  let updateMult = function(findFilter,input,callback){
    let response = []
    let all = find(findFilter)
    for(let i in all){
      let res = all[i].update(input)
      response.push(res)
    }
    if(typeof callback == "function"){callback(response)}
    return response
  }
  let searchOneUpdate = function(findFilter,input,callback){
    let response = []
    let all = searchOne(findFilter)
    for(let i in all){
      let res = all[i].update(input)
      response.push(res)
    }
    if(typeof callback == "function"){callback(response)}
    return response
  }
  let searchUpdate = function(findFilter,input,callback){
    let response = []
    let all = search(findFilter)
    for(let i in all){
      let res = all[i].update(input)
      response.push(res)
    }
    if(typeof callback == "function"){callback(response)}
    return response
  }
  let updateById = function(input,input2,callback){
    let result = update({__id:input},input2)
    if(typeof callback == "function"){callback(result)}
    return result
  }
  let updateAll = function(input,callback){
    let response = []
    let all = getAll()
    for(let i in all){
      let res = all[i].update(input)
      response.push(res)
    }
    if(typeof callback == "function"){callback(response)}
    return response
  }
  let deleteOne = function(input,callback){
    let item = findOne(input)
    let result = {}
    if(item){
      fs.unlinkSync(item.__dir)
      result.success="item removed"
    }else{
      result.error="no item found"
    }
    if(typeof callback == "function"){callback(result)}
    return result
  }
  let searchOneDelete = function(input,callback){
    let item = searchOne(input)
    let result = {}
    if(item){
      result = item.delete()
    }else{
      result.error="no item found"
    }
    if(typeof callback == "function"){callback(result)}
    return result
  }
  let searchDelete = function(input,callback){
    let result = []
    let all = search(input)
    for(let i in all){
      result.push(all[i].delete())
    }
    if(typeof callback == "function"){callback(result)}
    return result
  }
  let deleteMult = function(input,callback){
      let result = []
      let all = find(input)
      for(let i in all){
        result.push(all[i].delete())
      }
      if(typeof callback == "function"){callback(result)}
      return result
  }
  let deleteById = function(input,callback){
    let item = findById(input)
    let result = {}
    if(item){
      result = item.delete()
    }else{
      result.error="no item found"
    }
    if(typeof callback == "function"){callback(result)}
    return result
  }
  let deleteAll = function(callback){
    let result = []
    let all = getAll()
    for(let i in all){
      if(typeof all[i] == "object"){
        result.push(all[i].delete())
      }
    }
    if(typeof callback == "function"){callback(result)}
    return result
  }
  class leaf{
    constructor(){
      this.path = path;
      this.rules = rules;
      this.getAll = getAll;
      this.create = create;
      this.find = find;
      this.findOne = findOne;
      this.findById = findById;
      this.search = search;
      this.searchOne = searchOne;
      this.searchOneUpdate = searchOneUpdate;
      this.searchUpdate = searchUpdate;
      this.searchById = searchById;
      this.update = update;
      this.updateMult = updateMult;
      this.updateById = updateById;
      this.updateAll = updateAll;
      this.delete = deleteOne;
      this.searchOneDelete = searchOneDelete;
      this.searchDelete = searchDelete;
      this.deleteById = deleteById;
      this.deleteMult = deleteMult;
      this.deleteAll = deleteAll;
    }
  }
  let object = new leaf();
  Object.freeze(object);
  return object;
};
