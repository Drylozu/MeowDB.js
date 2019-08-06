# meowdb
#### Database in JSON (Node.JS Library)
## Installation
- `npm install --save meowdb`.

Example usage (you can look at a more detailed example at examples/index.js!):
```js
const path = require("path");
// Initialize MeowDB in a specific directory
const MeowDB = require("../src/index.js")(path.join(__dirname, "databases"));
// Creates a database called "Users"
const usrs = new MeowDB("Users");
// Creates an object (or ID) in the database
usrs.create("000001", {
    money: 1,
    info: "I only have 1$...",
    names: ["Johnny", "Gilmer"],
    banks: [{
        id: 0823,
        name: "MonsterCard",
        money: 0.2
    }, {
        id: 5362,
        name: "Colombian Bank",
        money: 0.8
    }]
});
usrs.create("000002", {
    money: 9999,
    info: "I have a lot of money, more than Deivid",
    names: ["Henry", "Harper"],
    banks: [{
        id: 9283,
        name: "Savi",
        money: 1887
    }, {
        id: 1502,
        name: "Bank of the Republic",
        money: 8112
    }]
});
// Shows all info stored
let allData = usrs.all();
console.log("Current all data in 'Users' database: ", allData);
// Sorts descending the users by money
let sortByMoney = usrs.sort("*", "money");
console.log("Users sorted descending by 'money':", sortByMoney);
```

## Implementation with `discord.js` or `eris`
It's very simple set and get info from the database, look this example from how to use it in a Discord Bot:
```js
const path = require("path");
const MeowDB = require("../src/index.js")(path.join(__dirname, "databases"));
const usrs = new MeowDB("Users");
let user = usrs.create(message.author.id, {
    money: 0,
    lvl: 0,
    xp: 0
});

await message.channel.send(`Adding 100$ and 200XP in your account.\n**Actual balance**: ${user.money}. **Actual XP**: ${user.xp}.`);
user.money += 100;
user.xp += 200;
dataUser.save();
await message.channel.send(`Your new balance is: ${user.money}\nAnd your XP: ${user.xp}`);
```

## API
1. [Initialize](#initialize)
    * `MeowDB(dir?)`
        * `new DB(name)`
            * `DB.create(id, startValue?)`
            * `DB.all()`
            * `DB.get(id)`
            * `DB.set(id, value)`
            * `DB.sort(id, element, ascending?)`

2. [Structures](#structures)
    * `new MeowErrorDB(msg?)`
    * `new MeowObjectDB(dir, name, id, obj)` 
        * `ObjDB.save()`

3. [Utils](#utils)
    * `create(path, name)`
    * `checkName(name)`
    * `checkId(id, acceptAll?)`
    * `createData(id, path, sValue)`
    * `readAllData(path)`
    * `getData(id, path, all?)`
    * `setData(id, path, data)`
    * `saveData(path, data)`

## Initialize
### MeowDB(dir?)
Initializes databases in the specified dir (default: `<ProjectApp>/meow-databases/`).

Returns: `Promise<MeowDB>`
```js
const MeowDB = require("meowdb")("<dir>");
```
#### new DB(name)
Creates a new database with the name specified.
```js
const db = new MeowDB("firstDatabase");
```
#### DB.create(id, startValue?)
Creates an element (Alias Object, ID) with a optionaly start value (default: `{}`).

Returns: `void`
```js
await DB.create("Juan0001", {
    id: 1923779128
});
```
#### DB.all()
Get all saved data.

Returns: `Object`
```js
let allData = DB.all();
console.log(allData);
```
#### DB.get(id)
Get all data from an specific ID (Alias Element, Object).

Returns: `any` (`MeowObjectDB` if it's a Object)
```js
let data = DB.get("Juan0001").
console.log(data);
```
#### DB.set(id, value)
Set data of an specific element (ID) and returns the new element.

Returns: `any` (`MeowObjectDB` if it's a Object)
```js
let newdata = DB.set("Juan0001.id", 1);
console.log(newdata);
```
#### DB.sort(id, element, ascending?)
Sort all entries from a ID in a respective element (default ascending: false, use "*" in id to get from the root of data).

Returns: `Array`
```js
let dataSort = DB.sort("*", "id", true);
console.log(dataSort);
```

## Structures
### new MeowErrorDB(msg?)
Error to send from the MeowDB (default message: "Unknown error").
```js
throw new MeowErrorDB("Some error");
```
### new MeowObjectDB(dir, name, id, obj)
A Object item from a database, creates a Object but with a method to save data.
```js
let ObjDB = new MeowObjectDB("<dir>", "firstDatabase", "Juan0001", { id: 1 });
console.log(ObjDB.id);
```
#### ObjDB.save()
Save the information edited or no.

Returns: `void`
```js
ObjDB.id = 132312323;
ObjDB.save();
console.log('New ObjDB id: ' + ObjDB.id);
```
## Utils (used internally by the module)
### create(path, name)
Creates the file `.json` that stores the data.

Returns: `void`
```js
Utils.create("<path>", "<name>");
```
### checkName(name)
Check if the name is valid (false if isn't).

Returns: `Boolean`
```js
Utils.checkName("someName");
```
### checkId(id, acceptAll?)
Check if the ID is valid (false if isn't, default acceptAll: false). AcceptAll = "*".

Returns: `Boolean`
```js
Utils.checkId(id);
```
### createData(id, path, sValue)
Creates the data and writes it in the file with the start value specified and returns it.

Returns: `any` (`MeowObjectDB` if it's a Object)
```js
Utils.createData("Juan0001", "<FileJSON>", {});
```
### readAllData(path)
Read all data from a file.

Returns: `Object`
```js
let allData = Utils.readAllData("<FileJSON>");
console.log(allData);
```
### getData(id, path, all?)
Get all data from a specified ID (default all: false). All = "*".

Returns: `any`
```js
let data = Utils.getData("id", "<FileJSON>");
console.log(allData);
```
### setData(id, path, data)
Set data of a specified ID and returns the new data.

Returns: `any` (`MeowObjectDB` if it's a Object)
```js
    let newData = Utils.setData('id', '<FileJSON>', 'data');
    console.log(newData);
```
### saveData(path, data)
Saves the data specified to the json file.

Returns: `void`
```js
Utils.saveData("<FileJSON>", JSON.stringify({ data: "some data" }));
```
