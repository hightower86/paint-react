import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";

interface Props {}

const Canvas = observer((props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(
      new Brush(canvasRef.current as HTMLCanvasElement, null, 0)
      // new Brush(canvasRef.current)
    );
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={600} height={400} />
    </div>
  );
});

export default Canvas;
