import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useParams } from "react-router-dom";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import { Message } from "../types";
import Modal from "./Modal";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

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
    let ctx = canvasRef.current!.getContext("2d");
    axios.get(`http://localhost:8000/image?id=${id}`).then((response) => {
      const img = new Image();
      img.src = response.data;
      img.onload = () => {
        ctx!.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
        ctx!.drawImage(
          img,
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
      };
    });
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
    switch (figure!.type) {
      case "brush":
        Brush.draw(
          ctx as CanvasRenderingContext2D,
          figure!.x,
          figure!.y,
          figure!.lineColor,
          figure!.lineWidth
        );
        break;
      case "eraser":
        Eraser.draw(
          ctx as CanvasRenderingContext2D,
          figure!.x,
          figure!.y,
          figure!.lineWidth
        );
        break;
      case "rect":
        Rect.staticDraw(
          ctx as CanvasRenderingContext2D,
          figure!.x,
          figure!.y,
          figure!.width,
          figure!.height,
          figure!.color,
          figure!.lineColor,
          figure!.lineWidth
        );
        break;
      case "circle":
        Circle.staticDraw(
          ctx as CanvasRenderingContext2D,
          figure!.x,
          figure!.y,
          figure!.r,
          figure!.color,
          figure!.lineColor,
          figure!.lineWidth
        );
        break;
      case "line":
        Line.staticDraw(
          ctx as CanvasRenderingContext2D,
          figure!.x,
          figure!.y,
          figure!.xTo,
          figure!.yTo,
          figure!.saved,
          figure!.lineColor,
          figure!.lineWidth
        );

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
  const mouseUpHandler = () => {
    axios
      .post(`http://localhost:8000/image?id=${id}`, {
        img: canvasRef.current!.toDataURL(),
      })
      .then((response) => console.log(response.data));
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
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
