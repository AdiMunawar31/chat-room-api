const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  participants: [{ type: String, required: true }],
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
