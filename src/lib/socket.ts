import { Server } from "socket.io";

let io: Server;

export function initSocket(server: any) {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-document", (documentId: string) => {
      socket.join(documentId);

      console.log(`${socket.id} joined ${documentId}`);
    });

    socket.on(
      "document-update",
      ({ documentId, content }) => {
        socket
          .to(documentId)
          .emit("receive-update", content);
      }
    );

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });

  return io;
}