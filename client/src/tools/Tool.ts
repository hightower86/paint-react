export default class Tool {
  canvas: HTMLCanvasElement;
  socket: WebSocket;
  id: string;
  ctx: CanvasRenderingContext2D;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  width: number;
  height: number;
  mouseDown: boolean;
  saved: string;
  name: string;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.destroyEvents();
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.width = 0;
    this.height = 0;
    this.mouseDown = false;
    this.saved = "";
    this.name = "";
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
