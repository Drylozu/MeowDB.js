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