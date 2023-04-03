const btn = document.getElementById("btn");

const socket = new WebSocket("ws://localhost:8000/");

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      message: "Hello",
      method: "connection",
      id: 555,
      username: "Adel",
    })
  );
};

socket.onmessage = (event) => {
  console.log("Message arrived from server", event.data);
};

btn.onclick = () => {
  socket.send(
    JSON.stringify({
      message: "Hello",
      method: "message",
      id: 555,
      username: "Adel",
    })
  );
};
