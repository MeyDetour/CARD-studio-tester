import { displayError } from "../../controller/error.js";
export function websocketErrorListen(socket) {
  socket.on("error", (err) => {
    console.log("RECEIVE ERROR :>>", { err });
    displayError(err);
  });
}
