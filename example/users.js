const path = require("path");
const MeowDB = require("meowdb")(path.join(__dirname, "databases"));
const usrs = new MeowDB("Users");
var usr1 = usrs.create("000001", {
    money: 1,
    info: "I only have 1$...",
    names: ["Johnny", "Gilmer"],
    banks: [{
        id: 0823,
        name: "MonsterCard",
        money: 0.2
    }, {
        id: 5362,
        name: "Colombian Bank",
        money: 0.8
    }]
});
var usr2 = usrs.create("000002", {
    money: 9999,
    info: "I have a lot of money, more than Deivid",
    names: ["Henry", "Harper"],
    banks: [{
        id: 9283,
        name: "Savi",
        money: 1887
    }, {
        id: 1502,
        name: "Bank of the Republic",
        money: 8112
    }]
});
let allData = usrs.all();
console.log("Current all data in 'Users' database: ", allData);
let sortByMoney = usrs.sort("*", "money");
console.log("Users sorted descending by 'money':", sortByMoney);

usr1.money += 150 * Math.PI;
usr1.banks[0].money = usr1.money - usr1.banks[1].money;
usr1.save();
console.log("Money after aument:", usrs.get("000001.money"));
usrs.set("000002.money", -1837);
console.log(`Now the user '000002' has ${usrs.get("000002.money")} of money`);
