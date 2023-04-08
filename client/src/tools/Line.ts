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
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "line",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            xTo: this.currentX,
            yTo: this.currentY,
            saved: this.saved,
            lineColor: this.ctx!.strokeStyle,
            lineWidth: this.ctx!.lineWidth,
          },
        })
      );
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

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    xTo: number,
    yTo: number,
    saved: string,
    lineColor: string,
    lineWidth: number
  ) {
    const { width, height } = ctx.canvas;
    const img = new Image();
    img.src = saved;
    img.onload = async function () {
      ctx!.clearRect(0, 0, width, height);
      ctx!.beginPath();
      ctx!.strokeStyle = lineColor;
      ctx!.lineWidth = lineWidth;
      ctx!.moveTo(x, y);
      ctx!.lineTo(xTo, yTo);
      ctx!.stroke();
      ctx!.drawImage(img, 0, 0, width, height);
    };
  }
}
