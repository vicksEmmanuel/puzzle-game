import { Server } from "Socket.IO";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      const room = (req.query as any)?.id;
      socket.join(room);

      socket.on("game-change", (msg) => {
        socket.broadcast.to(room).emit("update-game", msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
