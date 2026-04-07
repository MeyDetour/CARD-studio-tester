import { button } from "../button/button.js";

export function errorContainer(title, firstP, error, conseildépannage) {
  return /*html */ `<div id="error-container"> 
    <h1>${title}</h1>
   ${firstP ? "<p>"+firstP+"</p>" : ""}
    <span class="mainError">${error}</span>
    ${conseildépannage}
    ${button("home-dark",null,null,"navigateTo('/')","Retour à l’accueil","whiteButton",{})}
  </div>

 `;
}
