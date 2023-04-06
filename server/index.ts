import { ExtWS, Message } from "./types";
import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 8000;
const app = express();
const appWSServer = expressWs(app);
const aWss = appWSServer.getWss();

app.use(cors());
app.use(express.json());

appWSServer.app.ws("/", (ws, req) => {
  console.log("CONNECTION OK");
  // ws.send("You connected successfully");
  ws.on("message", (msg: string) => {
    const message = JSON.parse(msg);
    switch (message.method) {
      case "connection":
        connectionHandler(ws, message);
        break;
      case "draw":
        broadcastConnection(ws as any, message);
        break;
      case "message":
        console.log("method", message.method);
        break;

      default:
        break;
    }
  });
});

app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    return res.status(200).json({ message: "Загружено" });
  } catch (e) {
    console.log(e);
    return res.status(500).json("error");
  }
});

app.get("/image", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString("base64");
    res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json("error");
  }
});

const connectionHandler = (ws: any, msg: Message) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws: WebSocket, msg: Message) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
