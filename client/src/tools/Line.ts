import Tool from "./Tool";

export default class Line extends Tool {
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
    this.name = "Line";
  }

  listen() {
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.currentX = e.pageX - e.target.offsetLeft;
    this.currentY = e.pageY - e.target.offsetTop;
    this.ctx!.beginPath();
    this.ctx!.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas!.toDataURL();
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false;
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x: number, y: number) {
    const { ctx, canvas, currentX, currentY } = this;
    const img = new Image();
    img.src = this.saved;
    img.onload = async function () {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(img, 0, 0, canvas!.width, canvas!.height);
      ctx!.beginPath();
      ctx!.moveTo(currentX, currentY);
      ctx!.lineTo(x, y);
      ctx!.stroke();
    }.bind(this);
  }
}
