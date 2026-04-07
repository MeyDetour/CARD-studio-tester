 
export function messageLogComponent(message) {
 

  if (!message) {
    console.warn("please provide message");
    return;
  } 
  if (!message.content) {
    console.warn("please provide content");
    return;
  } 

  return /*html */ `
    <div class="message messageLog"><p>${message.content}</p></div>
    `
}

