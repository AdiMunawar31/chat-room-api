const { createOrUpdateUser } = require("../services/user.service");
const {
  createMessage,
  getMessagesByRoomId,
} = require("../services/message.service");
const {
  createRoom,
  getAllRooms,
  addUserToRoom,
} = require("../services/room.service");

const joinChat = async (req, res) => {
  try {
    const { name, socketId, roomId } = req.body;
    if (!name || !socketId || !roomId) {
      res
        .status(400)
        .json({ message: "Name, socketId, and roomId are required" });
      return;
    }

    const user = await createOrUpdateUser(name, socketId);
    await addUserToRoom(roomId, user._id);
    res.status(201).json({ message: "User joined", user });
  } catch (error) {
    console.error("Error in joinChat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderId, roomId, username, text } = req.body;
    if (!senderId || !roomId || !username || !text) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const message = await createMessage(roomId, senderId, username, text);
    res.status(201).json({ message: "Message sent", data: message });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await getMessagesByRoomId(roomId);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getRoomMessages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error in getRooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createRooms = async (req, res) => {
  try {
    const { roomName } = req.body;
    if (!roomName) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const message = await createRoom(roomName);
    res.status(201).json({ message: "Message sent", data: message });
  } catch (error) {
    console.error("Error in createRoom:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  joinChat,
  sendMessage,
  getRoomMessages,
  getRooms,
  createRooms,
};
