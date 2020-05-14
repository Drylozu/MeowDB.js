console.time("MeowDB.js");
const MeowDB = require("../src/");
const db = new MeowDB({
    dir: __dirname,
    name: "test"
});

console.log("Object creation (only if it doesn't exist)");
let object = db.create("0001", {
    name: "David",
    country: "CO",
    info: "Nothing to show"
});
console.log(object);
console.log();

console.log("Obtaining object");
object = db.get("0001");
console.log(object);
console.log();

console.log("List of objects");
object = db.all();
let temp = "";
Object.entries(object).forEach((object) => {
    temp += `   - ${object[1].name} (${object[0]})\n`;
});
console.log(temp.trim());
console.log();

console.log("Deleting object");
object = db.delete("0001");
console.log(object);
console.timeEnd("MeowDB.js");