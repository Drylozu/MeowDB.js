# meowdb
Database in JSON (Node.JS Library).

**Released v2.0.1**.


## Installation
- `npm install meowdb --save`.


Example usage:
```js
const meowdb = require("meowdb");
const UsersDB = new meowdb({
    dir: __dirname,
    name: "usersExampleDatabase"
});

UsersDB.create("0001", {
    name: "David",
    country: "CO",
    info: "Nothing to show",
    couple: "Mon"
}).then((user) => console.log(`Created user ${user.name}. ${user.name} lives in ${user.country}. ${user.name} loves ${user.couple} 💕`));

UsersDB.get("0001").then((user) => {
    user.info = "A simple person";
    user.save().then((newUser) => console.log(`New ${newUser.name} info:`, newUser.info));
});

UsersDB.all().then((users) => {
    let out = "Users list:";
    Object.entries(users).forEach((user) => {
        out += `  - ${user[1].name} (${user[0]})`;
    });
    console.log(out);
});

setTimeout(() => {
    UsersDB.delete("0001").then((user) => console.log(`User ${user.name} deleted from the database`));
}, 1500);
```


## Implementation with `discord.js` or `eris`
It's very simple set and get info from the database, look this example from how to use it in a Discord Bot:
```js
const meowdb = require("meowdb");
const UsersDB = new meowdb({
    dir: __dirname,
    name: "users"
});

// Event message/messageCreate
UsersDB.create(message.author.id, {
    lvl: 0,
    xp: 0
}); // Only creates the user if it doesn't exists in the database

UsersDB.get(message.author.id).then((user) => {
    user.xp += 1.25;
    if (xp === 10) user.lvl = 1;
    if (xp === 25) user.lvl = 2;
    if (xp === 40) user.lvl = 3;
    if (xp === 65) user.lvl = 4;
    if (xp === 80) user.lvl = 5;
    user.save();
}); // Adds 1.25 of experience to the user and sets the level of the user
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
* `create(id, startValue)` - Creates an element in the database with the specified ID and sets it's value.
* `exists(id)` - Returns true if exists an element with that ID, returns false if not.
* `get(id)` - Returns the value of the element stored with that ID.
* `set(id, value)` - Sets the value of an element.
* `all()` - Returns all objects stored in the database.
* `delete(id)` - Deletes an element from the database.