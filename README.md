# MeowDB.js
![MeowDB](https://i.imgur.com/cC7AZ18.png)

![Downloads](https://img.shields.io/npm/dt/meowdb)  ![Minified Size](https://img.shields.io/bundlephobia/min/meowdb) ![Dependencies](https://img.shields.io/librariesio/release/npm/meowdb) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/meowdb) ![License](https://img.shields.io/npm/l/meowdb) ![Last Commit](https://img.shields.io/github/last-commit/Drylotrans/MeowDB.js) ![Last Version Published](https://img.shields.io/npm/v/meowdb)

[![NPM](https://nodei.co/npm/meowdb.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/meowdb/)

"Database" in JSON (Node.JS Library).

**Released v2.1.9**. See [CHANGELOG](https://github.com/Drylotrans/MeowDB.js/blob/master/CHANGELOG.md).


## Installation
- `npm install meowdb --save`.

Also available in Ruby! [MeowDB.rb](https://rubygems.org/gems/meowdb)


## Usage
**JavaScript - Node.js require**
```js
const MeowDB = require("meowdb");

const myDatabase = new MeowDB({
    dir: __dirname,
    name: "database"
});
```

**TypeScript import**
```ts
import MeowDB from "meowdb";

const myDatabase: MeowDB = new MeowDB({
    dir: __dirname,
    name: "database"
});
```

**Example of all functions**
```js
// Creating object (only if it doesn't exist)
console.log(myDatabase.create("0001", {
    name: "David",
    country: "CO",
    info: "Nothing to show"
}));

// Obtaining an object
let object = myDatabase.get("0001");
console.log(object);

// Modifying an object and saving it
object.name = "Deivid";
object.save();
console.log(object.name);

// Setting directly the value of an element
console.log(myDatabase.set("0001.info", "Just a person"));

// Listing all objects
let temp = "";
Object.entries(myDatabase.all()).forEach((user) => {
    temp += `   - ${user[1].name} (ID: ${user[0]})\n`;
});
console.log(temp.trimRight());

// Finding an object
console.log(myDatabase.find((user) => user.name === "Deivid"));

// Filtering objects
console.log(myDatabase.filter((user) => user.country === "CO"));

// Deleting an object
console.log(myDatabase.delete("0001"));
```

## "Documentation"
- [`new MeowDB(options)`](#new-meowdboptions)
    - `create(id, initialValue)`
    - `exists(id)`
    - `get(id)`
    - `set(id, value)`
    - `all()`
    - `delete(id)`
    - `find(callback, id?)`
    - `filter(callback, id?)`
- [`MeowDBError`](#meowdberror)


## new MeowDB(options)
Creates or gets a database
- **Parameters**:
    - `options` - An object with the options
        - `options.dir` - A string indicating the directory that will have the database (must be an absolute path - the folder should be created)
        - `options.name` - A string with the name of the database
- **Throws**: [`MeowDBError`](#meowdberror) - If any option is invalid


### Methods
#### `all()`
Returns all data stored in the database
- **Returns**: `MeowDBObject` - All data
<hr>

#### `create(id, initialValue)`
Creates an element in the database with the specified ID and sets it's value
- **Parameters**:
    - `id` - A string representing the ID of the element to create
    - `initialValue` - The initial value of the element
- **Returns**: `Object` - The created element
- **Throws**: [`MeowDBError`](#meowdberror) - If the ID or initialValue is invalid
<hr>

#### `delete(id)`
Deletes an element from the database
- **Parameters**:
    - `id` - A string representing the ID of the element to delete
- **Returns**: `Object` - The deleted element
- **Throws**: [`MeowDBError`](#meowdberror) - If the ID is invalid
<hr>

#### `exists(id)`
Checks if an element exists in the database
- **Parameters**:
    - `id` - A string representing the ID of the element to check
- **Returns**: `Boolean` - If it exists
- **Throws**: [`MeowDBError`](#meowdberror) - If the ID is invalid
<hr>

#### `get(id)`
Gets an element of the database
- **Parameters**:
    - `id` - A string representing the ID of the element to get
- **Returns**: `*` - The element
- **Throws**: [`MeowDBError`](#meowdberror) - If the ID is invalid
<hr>

#### `set(id, value)`
Sets the value of an element in the database
- **Parameters**:
    - `id` - A string representing the ID of the element to update
    - `value` - The new value of the element
- **Returns**: `*` - The value setted
- **Throws**: [`MeowDBError`](#meowdberror) - If the ID or value is invalid
<hr>

#### `find(callback, id?)`
Finds an element in the database.
You __should only__ use this function if you're finding for objects
- **Parameters**:
    - `id` - A string representing the ID of the root element to find another elements
- **Returns**: `*` - The element
- **Throws**: [`MeowDBError`](#meowdberror) - If the ID or callback is invalid
<hr>

#### `filter(callback, id?)`
Filters elements in the database.
You __should only__ use this function if you're filtering for objects
- **Parameters**:
    - `id` - A string representing the ID of the root element to find another elements
- **Returns**: `*` - The elements (MeowDBObject[] if they're objects, array with ID and value if not)
- **Throws**: [`MeowDBError`](#meowdberror) - If the ID or callback is invalid


## MeowDBError
Extends [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error), only used for error reference.