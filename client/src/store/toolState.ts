import { makeAutoObservable } from "mobx";
import Tool from "../tools/Tool";

class ToolState {
  tool: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }
  setFillColor(color: unknown) {
    this.tool.fillColor = color;
  }
  setStrokeColor(color: string) {
    this.tool.strokeColor = color;
  }
  setLineWidth(width: string) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
