const { Users } = require("../models");

const userData = [
  {
    user_name: "Mary",
  },
  {
    user_name: "Jake",
  },
  {
    user_name: "Paul",
  },
  {
    user_name: "Tanya",
  },
  {
    User_name: "Donna",
  },
];

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;
