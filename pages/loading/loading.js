const loadingSteps = [
  "Connexion en cours...",
  "Préparation de la room...",
  "Vérification...",
  "Presque prêt...",
];

export function loadingPage() {
  let index = 0;
  const loadingAnimation = setInterval(() => {
    let eltText = document.querySelector(".loadingPage .text");
    let dot = document.querySelector(".loadingPage .dot" + [index % 4]);
    if (eltText && dot) {
      eltText.textContent = loadingSteps[index % 4];
      dot.classList.add("dot-animation");
      setTimeout(() => {
        dot.classList.remove("dot-animation");
      }, 500);
      index++;
    } else {
      console.warn("text or dot not found");
      console.log("dot :", dot);
      console.log("trext :", eltText);
    }
  }, 500);
  setTimeout(() => {
    clearInterval(loadingAnimation);
  }, 2000);
  // store the animation to stop it in router
  window.loadingAnimation = loadingAnimation;

  return /*html*/ `
     <div class="loadingPage">
        <div class="round"> 
            <div class="white"></div>
            <div class="loader"></div>
        </div>
        <div class="text"></div> 
        <div class="dots">
        <div class="dot0"></div>
        <div class="dot1"></div>
        <div class="dot2"></div>
        <div class="dot3"></div>
        </div>

     </div>
    
  `;
}
