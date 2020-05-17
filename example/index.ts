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
console.log(object);
console.log();

console.log("Obtaining an object");
object = db.get("0001");
console.log(object);
console.log();

console.log("Editing 'name' key and saving");
process.stdout.write(`${object.name} - `);
object.name = "Deivid";
object.save();
console.log(object.name);
console.log();

console.log("List of objects");
object = db.all();
let temp = "";
Object.entries(object).forEach((obj: [string, any]) => {
    temp += `   - ${obj[1].name} (${obj[0]})\n`;
});
console.log(temp.trim());
console.log();

console.log("Deleting an object");
object = db.delete("0001");
console.log(object);

console.timeEnd("MeowDB.js");