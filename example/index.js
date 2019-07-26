(async () => {
    const path = require("path");
    const MeowDB = await require("../src/index.js")(path.join(__dirname, "databases"));
    const usrs = new MeowDB("Users");
    await usrs.create("000001", {
        money: 1,
        info: "I only have 1$...",
        names: ["Johnny", "Gilmer"],
        banks: [{ id: 0823, name: "MonsterCard", money: 0.2 }, { id: 5362, name: "Colombian Bank", money: 0.8 }]
    });
    await usrs.create("000002", {
        money: 9999,
        info: "I have a lot of money, more than Deivid",
        names: ["Henry", "Harper"],
        banks: [{ id: 9283, name: "Savi", money: 1887 }, { id: 1502, name: "Bank of the Republic", money: 8112 }]
    });
    let allData = await usrs.all();
    console.log("Current all data in 'Users' database: ", allData);
    let sortByMoney = await usrs.sort("*", "money");
    console.log("Users sorted by 'money'", sortByMoney);
})();