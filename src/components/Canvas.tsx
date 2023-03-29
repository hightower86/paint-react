import React from "react";
import "../styles/canvas.scss";

interface Props {}

const Canvas = (props: Props) => {
  return (
    <div className="canvas">
      <canvas width={600} height={400} />
    </div>
  );
};

export default Canvas;
