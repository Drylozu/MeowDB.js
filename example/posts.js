const path = require("path");
const MeowDB = require("meowdb")(path.join(__dirname, "databases"));
const posts = new MeowDB("posts");

var post0 = posts.create('0', {
    content: 'My good post',
    author_name: 'tsuuuuki',
    likes: 0
});

console.log("A new post got created!\nIt has the id: " + post0._id + " and it's a MeowObjectDb so we can directly modify it!")
console.log("Btw it's content is: " + post0.content);
console.log("Lets modify that!");
post0.content = "Hello world";
post0.save();
console.log("Boom! New post content is: " + post0.content)
console.log(`This post has ${post0.likes} likes, lets add 100.`);
post0.likes+=100;
post0.save();
console.log("There we are! Now this posts has " + post0.likes)
