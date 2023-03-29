import { makeAutoObservable } from "mobx";

class ToolState {
  tool: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: unknown | null) {
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
