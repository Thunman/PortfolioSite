import { startServer, stopServer } from "./src/server.js";

const command = process.argv[2];

if (command === 'start') {
  console.log("Start cmd recived")
  startServer();
} else if (command === 'stop') {
  stopServer();
}