export default class Tool {
  canvas: HTMLCanvasElement | null;
  socket: any;
  id: number;
  ctx: CanvasRenderingContext2D | null;
  startX: number;
  startY: number;
  width: number;
  height: number;
  mouseDown: boolean;
  saved: string;

  constructor(canvas: HTMLCanvasElement, socket: any, id: number) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.ctx = canvas.getContext("2d");
    this.destroyEvents();
    this.startX = 0;
    this.startY = 0;
    this.width = 0;
    this.height = 0;
    this.mouseDown = false;
    this.saved = "";
  }

  set fillColor(color: string) {
    this.ctx!.fillStyle = color;
  }
  set strokeColor(color: string) {
    this.ctx!.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx!.lineWidth = width;
  }

  destroyEvents() {
    this.canvas!.onmousemove = null;
    this.canvas!.onmousedown = null;
    this.canvas!.onmouseup = null;
  }
}
