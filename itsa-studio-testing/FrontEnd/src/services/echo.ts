import Pusher from "pusher-js";
import Echo from "laravel-echo";

const pusher = new Pusher("923c60b7d3845007c1a3", {
  cluster: "us2",
  forceTLS: true,
  enabledTransports: ["ws", "wss"],
  disableStats: true,
});

const echo = new Echo({
  broadcaster: "pusher",
  key: "923c60b7d3845007c1a3",
  cluster: "us2",
  client: pusher,
  namespace: "",
});

//Pusher.logToConsole = true;

echo.connector.pusher.connection.bind("error", (err: any) => {
  console.error("Error en la conexión de:", err);
});

export default echo;
