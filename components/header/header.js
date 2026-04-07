import { button } from '../button/button.js'

export function headerComponent(page = "games") {
  return /*html */ ` 
    <header class="headerGames"> 
     ${button("left-arrow-dark", null, "/", null, "Retour", "withoutborder")}
                   
         
           ${page == "games" ? button("link-dark", null, "/enter-link", null, "Entrer un lien", "greyBorderButton") : ""}
                    
        </header>
    `;
}
 