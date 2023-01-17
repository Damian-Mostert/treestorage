let leaf =  require("./leaf")
let branch = require("./branch")
let treeStorage = function(root_path){
  if(!fs.existsSync(root_path)){fs.mkdirSync(root_path)};
  let items = function(){
    let result = {};
    for(let item in items){
      result[item] = leaf(root_path+"/"+item,items[item])
    };
    return branch(result)
  };
  return items;
}
treeStorage.leaf = leaf
treeStorage.branch = branch
module.exports = treeStorage
