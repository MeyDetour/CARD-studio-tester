export function displayError(error) {
  console.error(error)
  let content = /*html */ `  
             <p>${error.message}</p>
     
    `;
  let errorContainer = document.querySelector("#error-container");
  if (errorContainer) {
    errorContainer.innerHTML = content;
    errorContainer.style.display = "flex"
  } else {
    document.querySelector("#content").innerHTML += /*html */ ` 
        <div id="error-container">
            ${content}
        </div>
    `;
  }
}


export function setError(message) {
  let spanError = document.querySelector("#error");
  if (spanError) {
    spanError.textContent = message;
  } else {
    console.warn("Span Element not found");
  }
}
