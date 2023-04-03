import React from "react";
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
    toolState.setStrokeColor(e.target!.value);
    toolState.setFillColor(e.target!.value);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(new Brush(canvasState.canvas, null, 0))
        }
      />
      <button
        className="toolbar__btn rect"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas, null, 0))}
      />
      <button
        className="toolbar__btn circle"
        onClick={() =>
          toolState.setTool(new Circle(canvasState.canvas, null, 0))
        }
      />
      <button
        className="toolbar__btn eraser"
        onClick={() =>
          toolState.setTool(new Eraser(canvasState.canvas, null, 0))
        }
      />
      <button
        className="toolbar__btn line"
        onClick={() =>
          toolState.setTool(new Line(canvasState.canvas as HTMLCanvasElement))
        }
      />
      <input
        onChange={(e) => changeColor(e)}
        style={{ marginLeft: 10 }}
        type="color"
      />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      />
      <button
        className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      />
      <button className="toolbar__btn save" />
    </div>
  );
};

export default Toolbar;
