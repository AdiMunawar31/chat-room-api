const Room = require("../models/room.model");

const createRoom = async (roomName) => {
  const room = new Room({ name: roomName });
  await room.save();
  return room;
};

const getAllRooms = async () => {
  return await Room.find();
};

const addUserToRoom = async (roomId, userId) => {
  const room = await Room.findById(roomId);
  if (room) {
    room.participants.push(userId);
    await room.save();
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  addUserToRoom,
};
