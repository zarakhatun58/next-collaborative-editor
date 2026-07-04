import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import initializeSocket from "./socket";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

initializeSocket(io);

app.get("/", (_, res) => {
  res.send("Socket Server Running");
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Socket Server Running`);
  console.log(`http://localhost:${PORT}`);
});