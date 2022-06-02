const { Logs } = require("../models");

const chatData = [
  {
    dialog: "Hey Everybody!",
    sequence: 1,
    chat_id: 1,
    user_id: 1,
  },
  {
    dialog: "Hi Mary!",
    sequence: 2,
    chat_id: 1,
    user_id: 2,
  },
  {
    dialog: "Hey girl! Where you been?",
    sequence: 3,
    chat_id: 1,
    user_id: 5,
  },
  {
    pdialog: "Hiya :)",
    sequence: 4,
    chat_id: 1,
    user_id: 4,
  },
  {
    dialog: "Did someone just come in the room?",
    sequence: 5,
    chat_id: 1,
    user_id: 3,
  },
];

const seedChat = () => Logs.bulkCreate(chatData);

module.exports = seedChat;
