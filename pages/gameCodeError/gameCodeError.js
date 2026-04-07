 import { errorContainer } from "../../components/errorContainer/errorContainer.js";
export function gameCodeErrorPage(params = {}) {
 

 return /*html*/ `  
     <div class="gameCodeErrorPage">
        ${errorContainer(
          "Oupps",
          "Une erreur est survenue. Vous ne pouvez pas accéder à cette ressource pour le moment. Veuillez vérifier vos permissions ou contacter le support technique si le problème persiste.",
          "Le lien de la partie est invalide",
          `<h2>Conseils de dépannage</h2>
          <ul>
          <li>Vérifie que le lien ou le code est correct</li>
          <li>Assure-toi que la partie est toujours active</li>
          <li>Contacte l’hôte de la partie</li>
          </ul>
          
          `

        )}
    </div>
    `;
 
 
}
 

