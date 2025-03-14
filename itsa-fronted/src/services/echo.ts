import Pusher from "pusher-js";
import Echo from "laravel-echo";

const pusher = new Pusher("923c60b7d3845007c1a3", {
  cluster: "us2",
  forceTLS: true,
  enabledTransports: ["ws", "wss"], // Fuerza usar WebSocket
});

const echo = new Echo({
  broadcaster: "pusher",
  key: "923c60b7d3845007c1a3",
  cluster: "us2",
  client: pusher,
});

export default echo;
