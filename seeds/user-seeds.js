const { User } = require("../models");
const { Model, DataTypes } = require("sequelize");

const userData = [
  {
    username: "Mary",
    email: "111@111.com",
    password: "11111",
  },
  {
    username: "Jake",
    email: "222@222.com",
    password: "11111",
  },
  {
    username: "Paul",
    email: "333@333.com",
    password: "11111",
  },
  {
    username: "Tanya",
    email: "444@444.com",
    password: "11111",
  },
  {
    username: "Donna",
    email: "555@555.com",
    password: "11111",
  },
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;
