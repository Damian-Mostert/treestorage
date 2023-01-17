let fs = require("fs");
module.exports = function(objects){
  function ADD_SEARCH_FIND_DELETE(results){
    results.find=function(data,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].find(data)
        }
      }
      ADD_SEARCH_FIND_DELETE(subres)
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.search=function(data,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].search(data)
        }
      }
      ADD_SEARCH_FIND_DELETE(subres)
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.findOne=function(data,callback){
        let subres = {}
        for(let res in results){
          if(typeof results[res] == "object"){
            subres[res] = results[res].findOne(data)
          }
        }
        if(typeof callback == "function"){
          callback(subres)
        }
        return subres
      }
    results.searchOne=function(data,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].searchOne(data)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.update=function(oldData,newData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].update(oldData,newData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.updateAll=function(newData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].updateAll(newData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.updateById=function(oldData,newData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].updateById(oldData,newData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.updateMult=function(oldData,newData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].updateMult(oldData,newData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.searchUpdate=function(oldData,newData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].searchUpdate(oldData,newData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.searchOneUpdate=function(oldData,newData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].searchOneUpdate(oldData,newData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.searchDelete=function(oldData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].searchDelete(oldData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.searchOneDelete=function(oldData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].searchOneDelete(oldData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.delete=function(oldData,callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].delete(oldData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.deleteById=function(oldData){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].deleteById(oldData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.deleteMult=function(oldData){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].deleteMult(oldData)
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
    results.deleteAll= function(callback){
      let subres = {}
      for(let res in results){
        if(typeof results[res] == "object"){
          subres[res] = results[res].deleteAll()
        }
      }
      if(typeof callback == "function"){
        callback(subres)
      }
      return subres
    }
  }
  let ASYNC = false;
  for(let i in objects){
    if(typeof objects[i] == "object"){
      for(let o in objects[i]){
          if(typeof objects[i][o] == "function"){
            if(objects[i][o].constructor.name == "AsyncFunction"){
              ASYNC = true
            }
          }
      }
    }else{
      if(typeof objects[i] == "function"){
        if(objects[i].constructor.name == "AsyncFunction"){
          ASYNC = true
        }
      }
    }
  }

  for(let obj in objects){
    if(
      obj == "__id"||
      obj == "__v"||
      obj == "__dir"||
      obj == "change"||
      obj == "create"||
      obj == "rules"||
      obj == "getAll"||
      obj == "update"||
      obj == "updateMult"||
      obj == "updateById"||
      obj == "updateAll"||
      obj == "findOne"||
      obj == "find"||
      obj == "router"||
      obj == "listen"||
      obj == "searchOne"||
      obj == "searchById"||
      obj == "searchOneDelete"||
      obj == "searchDelete"||
      obj == "searchUpdate"||
      obj == "searchOneUpdate"||
      obj == "delete"||
      obj == "deleteMult"||
      obj == "deleteAll"||
      obj == "deleteById"
    ){
      throw new Error("cant use "+obj+" as object name")
    }
  }
  let Xobject = {
  "branch":function(){
      let rules = new function(){for(let obj in objects){this[obj] = objects[obj].rules}}()
      let path = new function(){for(let obj in objects){this[obj] = objects[obj].path}}()
      let create = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].create == "function"){
                  results[i] =await objects[i].create(data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].create == "function"){
                  results[i] = objects[i].create(data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let getAll = function(){
        if(ASYNC){
          return async function(callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].getAll == "function"){
                  results[i] = await objects[i].getAll()
                }
              }
            }
            ADD_SEARCH_FIND_DELETE(results)
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].getAll == "function"){
                  results[i] = objects[i].getAll()
                }
              }
            }
            ADD_SEARCH_FIND_DELETE(results)
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let update = function(){
        if(ASYNC){
          return async function(filter,data,callback){
           let results = {}
           for(let i in objects){
             if(typeof objects[i] == "object"){
               if(typeof objects[i].update == "function"){
                 results[i] = await objects[i].update(filter,data)
               }
             }
           }
           if(typeof callback == "function"){await callback(results)}
           return results
         }
        }else{
          return function(filter,data,callback){
           let results = {}
           for(let i in objects){
             if(typeof objects[i] == "object"){
               if(typeof objects[i].update == "function"){
                 results[i] = objects[i].update(filter,data)
               }
             }
           }
           if(typeof callback == "function"){callback(results)}
           return results
         }
        }
      }()

      let updateMult = function(){
        if(ASYNC){
          return async function(filter,data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].updateMult == "function"){
                  results[i] = await objects[i].updateMult(filter,data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(filter,data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].updateMult == "function"){
                  results[i] = objects[i].updateMult(filter,data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let searchOneUpdate = function(){
        if(ASYNC){
          return async function(filter,data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchOneUpdate == "function"){
                  results[i] = await objects[i].searchOneUpdate(filter,data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(filter,data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchOneUpdate == "function"){
                  results[i] = objects[i].searchOneUpdate(filter,data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let searchUpdate = function(){
        if(ASYNC){
          return async function(filter,data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchUpdate == "function"){
                  results[i] = await objects[i].searchUpdate(filter,data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(filter,data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchUpdate == "function"){
                  results[i] = objects[i].searchUpdate(filter,data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let updateById = function(){
        if(ASYNC){
          return async function(filter,data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].updateById == "function"){
                  results[i] = await objects[i].updateById(filter,data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
         }else{
           return function(filter,data,callback){
             let results = {}
             for(let i in objects){
               if(typeof objects[i] == "object"){
                 if(typeof objects[i].updateById == "function"){
                   results[i] = objects[i].updateById(filter,data)
                 }
               }
             }
             if(typeof callback == "function"){callback(results)}
             return results
           }
         }
      }()
      let updateAll = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].updateAll == "function"){
                  results[i] = await objects[i].updateAll(data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].updateAll == "function"){
                  results[i] = objects[i].updateAll(data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let findOne = function(){
          if(ASYNC){
            return async function(data,callback){
              let results = {}
              for(let i in objects){
                if(typeof objects[i] == "object"){
                  if(typeof objects[i].findOne == "function"){
                    results[i] = await objects[i].findOne(data)
                  }
                }
              }
              if(typeof callback == "function"){await callback(results)}
              return results
            }
          }else{
            return function(data,callback){
              let results = {}
              for(let i in objects){
                if(typeof objects[i] == "object"){
                  if(typeof objects[i].findOne == "function"){
                    results[i] = objects[i].findOne(data)
                  }
                }
              }
              if(typeof callback == "function"){callback(results)}
              return results
            }
          }
        }()
      let find = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].find == "function"){
                  results[i] = await objects[i].find(data)
                }
              }
            }
            ADD_SEARCH_FIND_DELETE(results)
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].find == "function"){
                  results[i] = objects[i].find(data)
                }
              }
            }
            ADD_SEARCH_FIND_DELETE(results)
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()

      let findById =function(){
          if(ASYNC){
            return async function(data,callback){
              let results = {}
              for(let i in objects){
                if(typeof objects[i] == "object"){
                  if(typeof objects[i].findById == "function"){
                    results[i] = await objects[i].findById(data)
                  }
                }
              }
              if(typeof callback == "function"){await callback(results)}
              return results
            }
          }else{
            return function(data,callback){
              let results = {}
              for(let i in objects){
                if(typeof objects[i] == "object"){
                  if(typeof objects[i].findById == "function"){
                    results[i] = objects[i].findById(data)
                  }
                }
              }
              if(typeof callback == "function"){callback(results)}
              return results
            }
          }
        }()
        let search = function(){
          if(ASYNC){
            return async function(data,callback){
              let results = {}
              for(let i in objects){
                if(typeof objects[i] == "object"){
                  if(typeof objects[i].search == "function"){
                    results[i] = await objects[i].search(data)
                  }
                }
              }
              ADD_SEARCH_FIND_DELETE(results)
              if(typeof callback == "function"){await callback(results)}
              return results
            }
          }else{
            return function(data,callback){
              let results = {}
              for(let i in objects){
                if(typeof objects[i] == "object"){
                  if(typeof objects[i].search == "function"){
                    results[i] = objects[i].search(data)
                  }
                }
              }
              ADD_SEARCH_FIND_DELETE(results)
              if(typeof callback == "function"){callback(results)}
              return results
            }
          }
        }()

        let searchById =function(){
            if(ASYNC){
              return async function(data,callback){
                let results = {}
                for(let i in objects){
                  if(typeof objects[i] == "object"){
                    if(typeof objects[i].searchById == "function"){
                      results[i] = await objects[i].searchById(data)
                    }
                  }
                }
                if(typeof callback == "function"){await callback(results)}
                return results
              }
            }else{
              return function(data,callback){
                let results = {}
                for(let i in objects){
                  if(typeof objects[i] == "object"){
                    if(typeof objects[i].searchById == "function"){
                      results[i] = objects[i].searchById(data)
                    }
                  }
                }
                if(typeof callback == "function"){callback(results)}
                return results
              }
            }
          }()
          let searchOne =function(){
              if(ASYNC){
                return async function(data,callback){
                  let results = {}
                  for(let i in objects){
                    if(typeof objects[i] == "object"){
                      if(typeof objects[i].searchOne == "function"){
                        results[i] = await objects[i].searchOne(data)
                      }
                    }
                  }
                  if(typeof callback == "function"){await callback(results)}
                  return results
                }
              }else{
                return function(data,callback){
                  let results = {}
                  for(let i in objects){
                    if(typeof objects[i] == "object"){
                      if(typeof objects[i].searchOne == "function"){
                        results[i] = objects[i].searchOne(data)
                      }
                    }
                  }
                  if(typeof callback == "function"){callback(results)}
                  return results
                }
              }
            }()
      let deleteAll = function(){
        if(ASYNC){
          return async function(callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].deleteAll == "function"){
                  results[i] = await objects[i].deleteAll()
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].deleteAll == "function"){
                  results[i] = objects[i].deleteAll()
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let deleteOne = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].delete== "function"){
                  results[i] = await objects[i].delete(data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].delete== "function"){
                  results[i] = objects[i].delete(data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let searchOneDelete = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchOneDelete == "function"){
                  results[i] = await objects[i].searchOneDelete(data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchOneDelete == "function"){
                  results[i] = objects[i].searchOneDelete(data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let searchDelete = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchDelete == "function"){
                  results[i] = await objects[i].searchDelete(data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].searchDelete == "function"){
                  results[i] = objects[i].searchDelete(data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let deleteMult = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].deleteMult == "function"){
                  results[i] = await objects[i].deleteMult(data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].deleteMult == "function"){
                  results[i] = objects[i].deleteMult(data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      let deleteById = function(){
        if(ASYNC){
          return async function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].deleteById == "function"){
                  results[i] = await objects[i].deleteById(data)
                }
              }
            }
            if(typeof callback == "function"){await callback(results)}
            return results
          }
        }else{
          return function(data,callback){
            let results = {}
            for(let i in objects){
              if(typeof objects[i] == "object"){
                if(typeof objects[i].deleteById == "function"){
                  results[i] = objects[i].deleteById(data)
                }
              }
            }
            if(typeof callback == "function"){callback(results)}
            return results
          }
        }
      }()
      this.path = path;
      this.rules = rules;
      this.getAll = getAll;
      this.create = create;
      this.find = find;
      this.findOne = findOne;
      this.findById = findById;
      this.search = search;
      this.searchOne = searchOne;
      this.searchUpdate = searchUpdate;
      this.searchOneUpdate = searchOneUpdate;
      this.searchById = searchById;
      this.update = update;
      this.updateMult = updateMult;
      this.updateById = updateById;
      this.updateAll = updateAll;
      this.delete = deleteOne;
      this.deleteById = deleteById;
      this.searchOneDelete = searchOneDelete;
      this.searchDelete = searchDelete;
      this.deleteMult = deleteMult;
      this.deleteAll = deleteAll;
      for(let i in objects){
        this[i] = objects[i]
      }
    }
  }
  let BRANCH = new Xobject["branch"]()
  Object.freeze(BRANCH);
  return BRANCH
}
