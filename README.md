# MeowDB.js
![MeowDB](https://i.imgur.com/ZN6PLil.png)

![Downloads](https://img.shields.io/npm/dt/meowdb)  ![Minified Size](https://img.shields.io/bundlephobia/min/meowdb) ![Dependencies](https://img.shields.io/librariesio/release/npm/meowdb) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/meowdb) ![License](https://img.shields.io/npm/l/meowdb) ![Last Commit](https://img.shields.io/github/last-commit/Drylotrans/MeowDB.js) ![Last Version](https://img.shields.io/github/package-json/v/Drylotrans/MeowDB.js) ![Last Version Published](https://img.shields.io/npm/v/meowdb)

[![NPM](https://nodei.co/npm/meowdb.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/meowdb/)

"Database" in JSON (Node.JS Library).

**Released v2.1.1**.


## Installation
- `npm install meowdb --save`.

Also available in Ruby! [MeowDB.rb](https://rubygems.org/gems/meowdb)


## Usage
<details>
<summary>JavaScript - Node.js require</summary>

```js
const MeowDB = require("meowdb");

const myDatabase = new MeowDB({
    dir: __dirname,
    name: "database"
});
```

</details>

<details>
<summary>TypeScript import</summary>

```ts
import MeowDB from "meowdb";

const myDatabase: MeowDB = new MeowDB({
    dir: __dirname,
    name: "database"
});
```

</details>

```js
// Creating object (only if it doesn't exist)
let object = myDatabase.create("0001", {
    name: "David",
    country: "CO",
    info: "Nothing to show"
});
console.log(object);

// Modifing an object and saving it
object.name = "Deivid";
object.save();
console.log(object);

// Obtaining an object
object = myDatabase.get("0001");
console.log(object);

// Listing objects
object = myDatabase.all();
let temp = "";
Object.entries(object).forEach((user) => {
    temp += `   - ${user[1].name} (ID: ${user[0]})\n`;
});
console.log(temp.trim());

// Deleting an object
object = myDatabase.delete("0001");
console.log(object);

// Average time of execution: 44ms.
```

## "Documentation"
- `new MeowDB(options)`
    * `create(id, startValue)`
    * `exists(id)`
    * `get(id)`
    * `set(id, value)`
    * `all()`
    * `delete(id)`



### new MeowDB(options)
Creates or gets a database.

**Parameters**:
* `options` - An object with the options
    * `options.dir` - A string indicating the   directory that will have the database
    * `options.name` - A string with the name of the database


**Methods**:
* `create(id, initialValue)` - Creates an element in the database with the specified ID and sets it's value.
* `exists(id)` - Returns true if exists an element with that ID, returns false if not.
* `get(id)` - Returns the value of the element stored with that ID.
* `set(id, value)` - Sets the value of an element.
* `all()` - Returns all objects stored in the database.
* `delete(id)` - Deletes an element from the database.