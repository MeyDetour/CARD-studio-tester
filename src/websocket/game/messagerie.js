import { updateListOfMessages, cleanMessageInput, addNewMessageInMessagerie, addMessageNotification } from "../../controller/game/messages.js";
export function gameMessagerieListen(socket) {
  //when player send message and message is successfully added
  socket.on("messageAddedInMessagerie", ({ messages, message }) => {
    console.log("RECEIVE MESSAGE SUCCESSFULLY ADDED IN MESSAGERIE :>>", {
      messages,
      message,
    });
    updateListOfMessages(messages);
    cleanMessageInput(message);
    addNewMessageInMessagerie(message);
  });

  socket.on("newMessageReceived", ({ messages, message }) => {
    console.log("RECEIVE NEW MESSAGE :>> ", { messages, message });
    updateListOfMessages(messages);
    addNewMessageInMessagerie(message);
    addMessageNotification();
  });
}