import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  socket: unknown | null = null;
  sessionid: unknown | null = null;
  undoList: Array<unknown> = [];
  redoList: Array<unknown> = [];
  username: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSessionId(id: number) {
    this.sessionid = id;
  }
  setSocket(socket: unknown) {
    this.socket = socket;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  pushToUndo(data: unknown) {
    this.undoList.push(data);
  }

  pushToRedo(data: never) {
    this.redoList.push(data);
  }

  undo() {
    let ctx = this.canvas?.getContext("2d");
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop() as string;
      this.redoList.push(this.canvas?.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    } else {
      ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    }
  }

  redo() {
    let ctx = this.canvas?.getContext("2d");
    if (this.redoList.length > 0) {
      let dataUrl: string = this.redoList.pop() as string;
      this.undoList.push(this.canvas!.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    }
  }
}

export default new CanvasState();
