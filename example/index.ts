console.time("MeowDB.js");

import MeowDB from "../";

const db: MeowDB = new MeowDB({
    dir: __dirname,
    name: "test"
});

console.log("Object creation (only if it doesn't exist)");
let object: any = db.create("0001", {
    name: "David",
    country: "CO",
    info: "Nothing to show"
});
console.log(object, "\n");

console.log("Obtaining an object");
object = db.get("0001");
console.log(object, "\n");

console.log("Editing 'name' key and saving");
process.stdout.write(`${object.name} - `);
object.name = "Deivid";
object.save();
console.log(object.name, "\n");

console.log("Setting directly the value of an element");
object = db.set("0001.info", "Just a person");
console.log(object, "\n");

console.log("List of objects");
object = db.all();
let temp = "";
Object.entries(object).forEach((obj: [string, any]) => {
    temp += `   - ${obj[1].name} (${obj[0]})\n`;
});
console.log(temp.trim(), "\n");

console.log("Deleting an object");
object = db.delete("0001");
console.log(object, "\n")

console.timeEnd("MeowDB.js");