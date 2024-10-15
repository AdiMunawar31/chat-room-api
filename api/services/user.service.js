const { User } = require("../models/user.model");

const createOrUpdateUser = async (name, socketId) => {
  const existingUser = await User.findOne({ name });

  if (existingUser) {
    existingUser.socketId = socketId;
    return await existingUser.save();
  }

  const newUser = new User({ name, socketId });
  return await newUser.save();
};

const deleteUserBySocketId = async (socketId) => {
  await User.deleteOne({ socketId });
};

module.exports = {
  createOrUpdateUser,
  deleteUserBySocketId,
};
