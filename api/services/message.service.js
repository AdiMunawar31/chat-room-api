const { Message } = require("../models/message.model");

const createMessage = async (roomId, senderId, username, text) => {
  const message = new Message({ roomId, senderId, username, text });
  return await message.save();
};

const getMessagesByRoomId = async (roomId) => {
  return await Message.find({ roomId });
};

module.exports = {
  createMessage,
  getMessagesByRoomId,
};
