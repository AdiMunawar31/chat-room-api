const { Router } = require("express");
const {
  joinChat,
  sendMessage,
  getRoomMessages,
  getRooms,
  createRooms,
} = require("../controllers/room.controller");

const router = Router();

router.post("/join", joinChat);

router.post("/message", sendMessage);
router.get("/messages/:roomId", getRoomMessages);

router.post("/rooms", createRooms);
router.get("/rooms", getRooms);

module.exports = router;
