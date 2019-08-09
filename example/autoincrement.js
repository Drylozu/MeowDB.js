const path = require("path");
const MeowDB = require("meowdb")(path.join(__dirname, "databases"));
const posts = new MeowDB("posts", 0);

// If the entry value is a object you can get the id directly!
var post_first = posts.create('autoincrement', {
    content: "This post is using autoincrement to determine the id!"
})

console.log("First post id: " + post_first._id);

// Else, use last!

posts.create('autoincrement', Math.PI);

console.log("Id of where we stored PI is: " + posts.last())
console.log("And PI is " + posts.get(posts.last()));
