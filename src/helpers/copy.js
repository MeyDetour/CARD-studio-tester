
export function copy(text) {
  navigator.clipboard.writeText(text).then(
    () => { 
      let elt = document.querySelector(".linkToCopy");
      let content = elt ? elt.textContent : "";
      if (elt) { 
        elt.textContent = "Copié !";
        setTimeout(() => { 
          elt.textContent = content;
        }, 1500);
      }
    },
    () => {
      /* clipboard write failed */
    },
  );
}
window.copy = copy;