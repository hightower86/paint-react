export interface Message {
  message: string;
  method: "message" | "connection" | "draw";
  id: number | string;
  username: string;
  figure?: {
    type: "brush" | "eraser" | "line" | "circle" | "rect" | "finish";
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  };
}
