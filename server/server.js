import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  startuser,
  disconnectuser,
  userconnected,
} from "./databasefunctions.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  // const res = await userconnected();
  //socket.broadcast.emit("main-chat-res", res);

  socket.on("joined-chat", async (arg) => {
    // console.log(arg); // world
    const data = await startuser({ ...arg, socketid: socket.id });
    socket.emit("joined-chat-res", data);

    const res = await userconnected();
    socket.broadcast.emit("joined-chat-res", res);
  });

  socket.on("chat-messages", (msg) => {
    // console.log(arg); // world
    var today = new Date();
    var time1 = today.getHours() + ":" + today.getMinutes();
    socket.emit("chat-messages-res", { ...msg, time: time1 });

    socket.broadcast.emit("chat-messages-res", { ...msg, time: time1 });
  });

  socket.on("joinedgroupcall", (peerdata) => {
    socket.broadcast.emit("joinedgroupcall-res", {
      ...peerdata,
      socketid: socket.id,
    });
  });

  socket.on("disconnect", async () => {
    console.log("idisconnected"); // the Set contains at least the socket ID

    socket.broadcast.emit("user-disconnected-groupcall", socket.id);
    const repsonce = await disconnectuser(socket.id);
    socket.broadcast.emit("joined-chat-res", repsonce);
  });
});

app.get("/", (req, res) => {
  res.send("server up on " + process.env.PORT);
});

httpServer.listen(process.env.PORT || 3000, () => {
  console.log("server started " + process.env.PORT);
});
