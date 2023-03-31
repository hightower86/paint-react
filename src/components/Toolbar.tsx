import React from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Rect from "../tools/Rect";

interface Props {}

const Toolbar = (props: Props) => {
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
      <button className="toolbar__btn eraser" />
      <button className="toolbar__btn line" />
      <input type="color" style={{ marginLeft: "10px" }} />
      <button className="toolbar__btn undo" />
      <button className="toolbar__btn redo" />
      <button className="toolbar__btn save" />
    </div>
  );
};

export default Toolbar;
