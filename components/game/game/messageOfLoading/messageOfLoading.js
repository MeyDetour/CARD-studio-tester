export function gameplay_messageOfLoading(messages) {
  return /*html*/` 

    <div class="loadMessagesContainer"> 
      <h2>Déroulement</h2>
      ${messages &&
        messages.length > 0 &&
        messages.map((message) => /*html */ `<span>${message}</span>`).join("")}
    
    </div>
  `;
}

export function addMessageInLoadingMessage(message) {
  let container = document.querySelector(".loadMessagesContainer");
  if (container) {
    let span = document.createElement("span");
    span.textContent = message;
    container.appendChild(span);
  }
}
