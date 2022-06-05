const Users = require("./Users");
const Logs = require("./Logs");

Users.hasMany(Logs, {
  foreignKey: "user_id",
});

Logs.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

module.exports = {
  Users,
  Logs,
};
