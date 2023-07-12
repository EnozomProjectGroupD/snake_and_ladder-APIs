import { consola } from "consola";
import { Server } from "socket.io";

let io;

export const socker = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // io.on("connection", (socket) => {
  //   consola.success("user connected");

  //   socket.on("disconnect", () => {
  //     consola.success("user disconnected");
  //   });

  //   socket.on("message", (data) => {
  //     consola.info("message: " + data);
  //   });
  // });
};

export { io };
