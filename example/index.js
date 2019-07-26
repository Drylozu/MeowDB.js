const meow = require("../src/index.js");
const dbs = new meow(__dirname + "/databases");

(async () => {
    await dbs.create("users");
    
})();