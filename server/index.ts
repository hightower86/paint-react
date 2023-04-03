import { ExtWS, Message } from "./types";
import express from "express";
import expressWs from "express-ws";

const PORT = process.env.PORT || 8000;
const app = express();
const appWSServer = expressWs(app);
const aWss = appWSServer.getWss();

app.get("/", (req, res) => {
  res.send("Express + TypeScript Serverv");
});

appWSServer.app.ws("/", (ws, req) => {
  console.log("CONNECTION OK");
  ws.send("You connected successfully");
  ws.on("message", (msg: any) => {
    const message = JSON.parse(msg);
    switch (message.method) {
      case "connection":
        connectionHandler(ws, message);
        break;
      case "message":
        console.log("method", message.method);
        break;

      default:
        break;
    }
  });
});

const connectionHandler = (ws: any, msg: Message) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws: ExtWS, msg: Message) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === msg.id) {
      client.send(`User ${msg.username} connected`);
    }
  });
};

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
