import { BsBrush, BsCircle, BsEraser } from "react-icons/bs";
import { MdRectangle, MdUndo, MdRedo, MdSave } from "react-icons/md";
import { TfiRulerPencil } from "react-icons/tfi";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Rect from "../tools/Rect";

interface Props {}

const Toolbar = (props: Props) => {
  const changeColor = (e: Record<string, any>) => {
    // toolState.setStrokeColor(e.target!.value);
    toolState.setFillColor(e.target!.value);
  };

  const download = () => {
    const dataUrl = canvasState.canvas!.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas as HTMLCanvasElement,
              canvasState.socket as WebSocket,
              canvasState.sessionid || ""
            )
          )
        }
      >
        <BsBrush size={25} />
      </button>
      <button
        className="toolbar__btn"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas as HTMLCanvasElement,
              canvasState.socket as WebSocket,
              canvasState.sessionid || ""
            )
          )
        }
      >
        <MdRectangle size={25} />
      </button>
      <button
        className="toolbar__btn"
        onClick={() =>
          toolState.setTool(
            new Circle(
              canvasState.canvas as HTMLCanvasElement,
              canvasState.socket as WebSocket,
              canvasState.sessionid || ""
            )
          )
        }
      >
        <BsCircle size={25} />
      </button>
      <button
        className="toolbar__btn"
        onClick={() =>
          toolState.setTool(
            new Eraser(
              canvasState.canvas as HTMLCanvasElement,
              canvasState.socket as WebSocket,
              canvasState.sessionid || ""
            )
          )
        }
      >
        <BsEraser size={25} />
      </button>
      <button
        className="toolbar__btn"
        onClick={() =>
          toolState.setTool(
            new Line(
              canvasState.canvas as HTMLCanvasElement,
              canvasState.socket as WebSocket,
              canvasState.sessionid || ""
            )
          )
        }
      >
        <TfiRulerPencil size={25} />
      </button>
      <input
        onChange={(e) => changeColor(e)}
        style={{ marginLeft: 10 }}
        type="color"
      />
      <button
        className="toolbar__btn ml-auto"
        onClick={() => canvasState.undo()}
      >
        <MdUndo size={25} />
      </button>
      <button className="toolbar__btn " onClick={() => canvasState.redo()}>
        <MdRedo size={25} />
      </button>
      <button className="toolbar__btn mr-2" onClick={download}>
        <MdSave size={25} />
      </button>
    </div>
  );
};

export default Toolbar;
