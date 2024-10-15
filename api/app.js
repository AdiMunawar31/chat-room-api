const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server: SocketIOServer } = require("socket.io");
const connectMongo = require("./configs/mongo.config");
const chatRoutes = require("./routes/chat.routes");
const { handleSocketConnection } = require("./controllers/socket.controller");

connectMongo();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "https://chat-room-api-tau.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "https://chat-room-api-tau.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

handleSocketConnection(io);

app.use("/api/chat", chatRoutes);
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = { httpServer };
