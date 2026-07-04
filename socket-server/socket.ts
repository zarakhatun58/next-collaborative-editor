import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  role?: "OWNER" | "EDITOR" | "VIEWER";
}

interface SocketUser extends Socket {
  user?: UserPayload;
}
const documentUsers = new Map<
  string,
  Map<
    string,
    {
      id: string;
      email: string;
    }
  >
>();

export default function initializeSocket(io: Server) {
  // ==========================
  // Authentication Middleware
  // ==========================

  io.use((socket: SocketUser, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers.authorization?.replace(
          "Bearer ",
          ""
        );

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as UserPayload;

      socket.user = payload;

      next();
    } catch {
      next(new Error("Invalid Token"));
    }
  });

  // ==========================
  // Connection
  // ==========================

  io.on("connection", (socket: SocketUser) => {
    console.log("Connected:", socket.user?.email);

    // -----------------------
    // Join Document
    // -----------------------
socket.on(
  "join-document",
  ({ documentId }: { documentId: string }) => {

    socket.join(documentId);

    if (!documentUsers.has(documentId)) {
      documentUsers.set(documentId, new Map());
    }

    documentUsers
      .get(documentId)!
      .set(socket.id, {
        id: socket.user!.id,
        email: socket.user!.email,
      });

    io.to(documentId).emit(
      "presence",
      Array.from(
        documentUsers
          .get(documentId)!
          .values()
      )
    );

    console.log(
      `${socket.user?.email} joined ${documentId}`
    );

  }
);

    // -----------------------
    // Leave
    // -----------------------
socket.on(
  "leave-document",
  ({ documentId }: { documentId: string }) => {

    socket.leave(documentId);

    documentUsers
      .get(documentId)
      ?.delete(socket.id);

    io.to(documentId).emit(
      "presence",
      Array.from(
        documentUsers
          .get(documentId)
          ?.values() ?? []
      )
    );

  }
);

    // -----------------------
    // Document Update
    // -----------------------

    socket.on(
      "document-update",
      ({
        documentId,
        content,
        version,
      }: {
        documentId: string;
        content: any;
        version: number;
      }) => {
        if (socket.user?.role === "VIEWER") return;

        socket.to(documentId).emit(
          "receive-update",
          {
            content,
            version,
            userId: socket.user?.id,
          }
        );
      }
    );

    // -----------------------
    // Cursor
    // -----------------------

    socket.on(
      "cursor-update",
      ({
        documentId,
        position,
      }: {
        documentId: string;
        position: number;
      }) => {
        socket.to(documentId).emit(
          "cursor-update",
          {
            userId: socket.user?.id,
            position,
          }
        );
      }
    );

    // -----------------------
    // Typing
    // -----------------------

    socket.on(
      "typing",
      ({
        documentId,
        typing,
      }: {
        documentId: string;
        typing: boolean;
      }) => {
        socket.to(documentId).emit(
          "typing",
          {
            userId: socket.user?.id,
            typing,
          }
        );
      }
    );
// -----------------------
// Live Cursor
// -----------------------

socket.on(
  "cursor-move",
  ({
    documentId,
    x,
    y,
  }: {
    documentId: string;
    x: number;
    y: number;
  }) => {
    socket.to(documentId).emit("cursor-move", {
      id: socket.user?.id,
      name: socket.user?.email,
      color: "#8b5cf6",
      x,
      y,
    });
  }
);
    // -----------------------
    // Disconnect
socket.on("disconnect", () => {

  documentUsers.forEach(
    (users, documentId) => {

      users.delete(socket.id);

      io.to(documentId).emit(
        "presence",
        Array.from(users.values())
      );

    }
  );

  console.log(
    `${socket.user?.email} disconnected`
  );

});
  });
}