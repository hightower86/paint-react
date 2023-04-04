import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";
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
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(
      new Brush(canvasRef.current as HTMLCanvasElement, null, 0)
      // new Brush(canvasRef.current)
    );
  }, []);

  useEffect(() => {
    if (!canvasState.username) return;

    const socket = new WebSocket("ws://localhost:8000/");
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
      console.log(event.data);
    };
  }, [canvasState.username]);

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
        {/* <p className="py-4">
          You havve been selected for a chance to get one year of subscription
          to use Wikipedia for free!
        </p> */}
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
