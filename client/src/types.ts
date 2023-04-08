export interface Message {
  message: string;
  method: "message" | "connection" | "draw";
  id: number | string;
  username: string;
  figure?: {
    type: "brush" | "eraser" | "line" | "circle" | "rect" | "finish";
    x: number;
    y: number;
    xTo: number;
    yTo: number;
    r: number;
    width: number;
    height: number;
    color: string;
    lineColor: string;
    lineWidth: number;
    saved: string;
  };
  tool?: {
    name: string;
    strokeColor?: string;
    fillColor?: string;
  };
}
