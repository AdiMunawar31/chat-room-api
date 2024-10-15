const messageService = require("../services/message.service");
const userService = require("../services/user.service");

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", async ({ name, roomId }) => {
      await userService.createOrUpdateUser(name, socket.id);
      socket.join(roomId);
      console.log(`${name} joined room: ${roomId}`);
    });

    socket.on("message", async ({ roomId, senderId, username, text }) => {
      const message = await messageService.createMessage(
        roomId,
        senderId,
        username,
        text
      );
      io.to(roomId).emit("message", message);
    });

    socket.on("disconnect", async () => {
      await userService.deleteUserBySocketId(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { handleSocketConnection };
