import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";
import { Message } from "../types";
import Modal from "./Modal";

interface Props {}

const Canvas = observer((props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [modalOpened, setModalOpened] = useState(true);
  const { id } = useParams();

  const toggleModal = () => {
    setModalOpened((prev) => !prev);
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current as HTMLCanvasElement);
  }, []);

  useEffect(() => {
    if (!canvasState.username) return;

    const socket = new WebSocket("ws://localhost:8000/");
    canvasState.setSocket(socket);
    canvasState.setSessionId(id || "");
    toolState.setTool(
      new Brush(canvasRef!.current as HTMLCanvasElement, socket, id as string)
    );
    socket.onopen = () => {
      console.log("Connection Exists");
      socket.send(
        JSON.stringify({
          id,
          username: canvasState.username,
          method: "connection",
        })
      );
    };

    socket.onmessage = (event) => {
      console.log({ event });
      let msg = JSON.parse(event.data);
      switch (msg.method) {
        case "connection":
          console.log(`User ${msg.username} connected`);
          break;
        case "draw":
          drawHandler(msg);
          break;

        default:
          break;
      }
    };
  }, [canvasState.username]);

  const drawHandler = (msg: Message) => {
    const figure = msg.figure;
    const ctx = canvasRef.current!.getContext("2d");
    console.log({ figure }, { ctx });
    switch (figure!.type) {
      case "brush":
        Brush.draw(ctx as CanvasRenderingContext2D, figure!.x, figure!.y);
        break;
      case "finish":
        ctx?.beginPath();
        break;

      default:
        break;
    }
  };

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current!.toDataURL());
  };

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current!.value);
    setModalOpened(false);
  };

  return (
    <div className="canvas">
      <Modal open={modalOpened}>
        <h3 className="font-bold text-lg">Input UserName please</h3>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs mt-8"
        />
        <div className="modal-action">
          <label className="btn btn-primary" onClick={connectHandler}>
            Login!
          </label>
        </div>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
