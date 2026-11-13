require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({
  app: "HiiLiveVideo",
  status: "starter-online",
  note: "Demo signaling only. Add authenticated user tokens before production."
}));

// Minimal Socket.IO signaling room prototype.
// This relays offer/answer/ICE messages; it does NOT carry video media.
// Production must add auth, rate limits, moderation, persistence and TURN/SFU.
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.ALLOWED_ORIGIN || "*", methods: ["GET","POST"] }
});

const waiting = [];
io.on("connection", socket => {
  socket.on("join-random", () => {
    const other = waiting.shift();
    if (other && io.sockets.sockets.has(other)) {
      const room = [socket.id, other].sort().join("-");
      socket.join(room); io.sockets.sockets.get(other).join(room);
      io.to(room).emit("matched", { room });
    } else waiting.push(socket.id);
  });

  socket.on("signal", ({ room, payload }) => {
    if (typeof room !== "string" || !payload) return;
    socket.to(room).emit("signal", payload);
  });

  socket.on("leave-call", ({ room }) => {
    if (room) socket.to(room).emit("peer-left");
    socket.leave(room);
  });

  socket.on("disconnect", () => {
    const i = waiting.indexOf(socket.id);
    if (i >= 0) waiting.splice(i, 1);
  });
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => console.log(`HiiLiveVideo signaling starter on :${port}`));
