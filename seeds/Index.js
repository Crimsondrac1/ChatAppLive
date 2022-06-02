const seedUsers = require("./user-seeds");
const seedLogs = require("./chatlog-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUsers();
  console.log("\n----- Users SEEDED -----\n");

  await seedLogs();
  console.log("\n----- Chat Logs SEEDED -----\n");

  process.exit(0);
};

seedAll();
