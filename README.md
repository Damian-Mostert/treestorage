
<center>

# npm treestorage 1.0.2 🌳
### A fully open source database building tool for node.js

</center>


### install :


```cmd
npm i treestorage
```

<center>

#### example 1 - branch with leaf 🌿

</center>

```js
let treeStorage = require("treestorage")

let database = treeStorage(__dirname+"/database")

database.users = {
  name:{type:String,require:true,maxSize:30},
  surname:{type:String,require:true,maxSize:30},
  email:{unique:true,type:String,require:true,maxSize:100,lowerCase:true,match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,solid:true},
  password:{type:String,require:true,maxSize:35,minSize:8,private:true},
}

let __db = database();

__db.create({
  name:"Damian",
  surname:"Mostert",
  email:"damian@example.com",
  password:"password1"
},result=>{
  console.log(result)
})

console.log(__db.search({name:"d"}))
```

<center>

###### output

</center>

```cmd
let treeStorage = require("treestorage")

let database = treeStorage(__dirname+"/database")

database.users = {
  name:{type:String,require:true,maxSize:30},
  surname:{type:String,require:true,maxSize:30},
  email:{unique:true,type:String,require:true,maxSize:100,lowerCase:true,match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,solid:true},
  password:{type:String,require:true,maxSize:35,minSize:8,private:true},
}

let __db = database();

__db.create({
  name:"Damian",
  surname:"Mostert",
  email:"damian@example.com",
  password:"password1"
},result=>{
  console.log(result)
})

console.log(__db.search({name:"d"}))
```

<center>

#### example 2 - leaf 🍃

</center>

```js
let treeStorage = require("treestorage")

let users = treeStorage.leaf(__dirname+"/users",{
  name:{type:String,require:true,maxSize:30},
  surname:{type:String,require:true,maxSize:30},
  email:{unique:true,type:String,require:true,maxSize:100,lowerCase:true,match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,solid:true},
  password:{type:String,require:true,maxSize:35,minSize:8,private:true},
})

users.create({
  name:"Damian",
  surname:"Mostert",
  email:"damian@example.com",
  password:"password1"
},result=>{
  console.log(result)
})

users.searchOne({name:"d"},user=>{
  if(user){
    console.log(user.change({name:"Bob",surname:"Lukas"}))
  }
})

console.log(users.getAll())

console.log(users.deleteAll())

```
<center>

###### output

</center>

```cmd
{ errors: [], success: 'item made' }
{ errors: [], success: 'item updated' }
[
  {
    name: 'Bob',
    surname: 'Lukas',
    email: 'damian@example.com',
    password: 'password1',
    __v: 1,
    __id: '4GW5VxQSIDeRlykS39S9eyEd90dIsnNDeK11OaR0eGqSnXyQ1rZdkMVoOW4o68meG8QBFnvuOzU',
    __dir: '/home/damian/Desktop/d/users/4GW5VxQSIDeRlykS39S9eyEd90dIsnNDeK11OaR0eGqSnXyQ1rZdkMVoOW4o68meG8QBFnvuOzU',
    delete: [Function],
    update: [Function],
    change: [Function]
  }
]
[ { success: 'item removed' } ]
```

<center>

#### example 3 - branch 🌿

</center>

```js
let treeStorage = require("treestorage")

let userTemplate = {
  name:{type:String,require:true,maxSize:30},
  surname:{type:String,require:true,maxSize:30},
  email:{unique:true,type:String,require:true,maxSize:100,lowerCase:true,match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,solid:true},
  password:{type:String,require:true,maxSize:35,minSize:8,private:true},
}

let users = treeStorage.leaf(__dirname+"/users",userTemplate)

let database2 = treeStorage(__dirname+"/database")

database2.users = userTemplate

let __db = database2();

let fullDB = treeStorage.branch({
  backup:__db,
  main:users
})

fullDB.create({
  name:"Damian",
  surname:"Mostert",
  email:"damian@example.com",
  password:"password1"
},result=>{
  console.log(result)
})

console.log(fullDB.getAll())

console.log(fullDB.deleteAll())
```

<center>

###### output

</center>

```cmd
{
  backup: { users: { errors: [], success: 'item made' } },
  main: { errors: [], success: 'item made' }
}
{
  backup: { users: [ [Object] ] },
  main: [
    {
      name: 'Damian',
      surname: 'Mostert',
      email: 'damian@example.com',
      password: 'password1',
      __v: 0,
      __id: 'iP173bwqih5tjPz4o4xKCouL8yB2uMhnIdQOpFp1GDtq1DfoVrr2xiecA4zQ7Rb7bCVQKVltPcy',
      __dir: '/home/damian/Desktop/d/users/iP173bwqih5tjPz4o4xKCouL8yB2uMhnIdQOpFp1GDtq1DfoVrr2xiecA4zQ7Rb7bCVQKVltPcy',
      delete: [Function],
      update: [Function],
      change: [Function]
    }
  ]
}
{
  backup: { users: [ [Object] ] },
  main: [ { success: 'item removed' } ]
}
```

<center>

## leaf template options
| option name | explenation | santax usage |
| ------------- |:-------------:|:-------------:|
| unique | makes shure there wont be a duplicate inside leaf object |```{type:Array,}```|
| private | will disable all finding and searching by this object |```{private:true,}```|
| type | wont create item if it is the incorect type | ```{type:Object,}``` ```{type:String,}``` ```{type:Array,}``` ```{type:Number,}``` |
| match | same as using ```String.match(/a-x/)``` match is good to check emails and passwords | ```{match:/a-z/,}```  |
| require | won't create item without this data | ```{require:true,}``` |
| size | wont create item if String.length or Number not == to size | ```{size:5,}``` |
| minSize |  wont create item if String.length or Number not >= to size | ```{minSize:2,}``` |
| maxSize | wont create item if String.length or Number not <= to size | ```{maxSize:10,}``` |
| lowerCase | will automaticly save as lowerCase if String | ```{lowerCase:true,}``` |
| upperCase | will automaticly save as upperCase if String | ```{upperCase:true,}``` |
| solid | if a storage item on leaf set to solid, it canot be changed | ```{solid:true,}``` |

## leaf and branch tool list

| tool name | explenation | santax | santax with callback example |
| ------------- |:-------------:|:-------------:|:-------------:|
|getAll| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|create| used make a item in a leaf or items in branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|find| used to find multiple objects with exact match to filter| ```results=object.find({/*filter_data*/})```|```object.find({/*filter_data*/,results=>{})```|
|findOne| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|findById| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|search| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|searchOne| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|searchOneUpdate| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|searchById| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|update| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|updateMult| used to update multipe items in leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|updateById| used to update items in a leaf object by there ```.__id``` value| ```All=object.getAll()```|```object.getAll(All=>{})```|
|updateAll| used to update all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|delete| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|searchOneDelete| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|searchDelete| used to get all items in a leaf or branch object | ```All=object.getAll()```|```object.getAll(All=>{})```|
|deleteById| used to delete a object by its .```__id``` value | ```result=object.getAll()```|```object.getAll(All=>{})```|
|deleteMult| used to delete multiple items in database with find results | ```results=object.deleteMult({/*find_filter*/})```|```object.deleteMult({/*find_filter*/},results=>{  })```|
|deleteAll| deletes all in leaf or branch | ```result=object.deleteAll()```|```object.deleteAll(result=>{})```|
## treeStorage database object structure example

</center>

```js
branch {
  path: { users: '/home/damian/Desktop/d/database/users' },
  rules: {
    users: {
      name: [Object],
      surname: [Object],
      email: [Object],
      password: [Object]
    }
  },
  getAll: [Function: getAll],
  create: [Function: create],
  find: [Function: find],
  findOne: [Function: findOne],
  findById: [Function: findById],
  search: [Function: search],
  searchOne: [Function: searchOne],
  searchUpdate: [Function: searchUpdate],
  searchOneUpdate: [Function: searchOneUpdate],
  searchById: [Function: searchById],
  update: [Function: update],
  updateMult: [Function: updateMult],
  updateById: [Function: updateById],
  updateAll: [Function: updateAll],
  delete: [Function: deleteOne],
  deleteById: [Function: deleteById],
  searchOneDelete: [Function: searchOneDelete],
  searchDelete: [Function: searchDelete],
  deleteMult: [Function: deleteMult],
  deleteAll: [Function: deleteAll],
  users: leaf {
    path: '/home/damian/Desktop/d/database/users',
    rules: {
      name: [Object],
      surname: [Object],
      email: [Object],
      password: [Object]
    },
    getAll: [Function: getAll],
    create: [Function: create],
    find: [Function: find],
    findOne: [Function: findOne],
    findById: [Function: findById],
    search: [Function: search],
    searchOne: [Function: searchOne],
    searchOneUpdate: [Function: searchOneUpdate],
    searchUpdate: [Function: searchUpdate],
    searchById: [Function: searchById],
    update: [Function: update],
    updateMult: [Function: updateMult],
    updateById: [Function: updateById],
    updateAll: [Function: updateAll],
    delete: [Function: deleteOne],
    searchOneDelete: [Function: searchOneDelete],
    searchDelete: [Function: searchDelete],
    deleteById: [Function: deleteById],
    deleteMult: [Function: deleteMult],
    deleteAll: [Function: deleteAll]
  }
}
```

<center>

| Auther | Damian Mostert |
| ------------- |:-------------:|
| Email | damianmostert86@gmail.com |

</center>
