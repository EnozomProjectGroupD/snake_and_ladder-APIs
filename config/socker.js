import { Server } from "socket.io";

export const socker = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("join", (room) => {
      console.log("join room", room);
      socket.join(room);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("updateGame", (data) => {
      console.log("updateGame", data);
      io.to(data.room).emit("updateGame", data);
    });
  });
};
