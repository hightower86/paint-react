export interface Message {
  message: string;
  method: "message" | "connection" | "draw";
  id: number | string;
  username: string;
  tool: {
    name: string;
    fillColor: string;
    strokeColor: string;
  };
}

export interface ExtWS extends WebSocket {
  id: number | string;
}

type ValueOf<T> = T[keyof T];

const UserRole = {
  ADMIN: "admin",
  USER: "user",
} as const;

type UserRole = ValueOf<typeof UserRole>;

function fn(user: UserRole) {
  return user;
}

// fn("data");
