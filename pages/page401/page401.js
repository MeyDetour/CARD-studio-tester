import { button } from "../../components/button/button.js";

export function page401() {
  return /*html*/ `  <div class="page401">

        <main> 
            <h1>Connexion invalide</h1> 
            <p>
            Votre session a expiré ou est invalide. Veuillez retourner sur Card Studio pour relancer la session de test. 
            </p>  
            ${button(null,null,null, "redirectToCardStudio", "Retourner sur Card Studio",null)}
            
            
            </div>
        </main>
      
      
    </div>
    `;
}
