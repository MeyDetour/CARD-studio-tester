import { button } from '../../components/button/button.js'

export function homePage() {
    return /*html*/ `  <div class="homePage">

        <div class="header">
            <img src="/assets/logo.svg"/>
            <h1>CARD Games</h1>
            <p>Rejoins une partie existante ou crée ta propre partie pour jouer avec tes amis</p>
        </div>
        <div class="content">
            <div class="left">
                    <div class="headerContainer">
                        <img src="/assets/link.svg"/>
                        <h2>Rejoindre une partie</h2>
                    </div>
                    <p>Entre le lien d'invitation que tu as reçu pour rejoindre une partie en cours</p>
                    <div class="contenu">
                        <h3>Lien d'invitation</h3>
                        <div class="linkContainer">
                                <input placeholder="code de la partie" id="roomCode"/> 
                                ${button(null, "right-arrow", null, "verifyGameId", "Rejoindre", "greyButton",{pathOnEchec:"/"})}
                        </div>
                    </div>
                    <div class="container">
                            <ul>
                            <li><p>Le lien t'est fourni par l'hôte de la partie. Il te permet de rejoindre directement sa room.</p></li>
                            </ul>
                    </div>
                </div>
                <div class="right">
                    <div class="headerContainer">
                        <img src="/assets/room.svg"/>
                        <h2>Créer une partie</h2>
                    </div>

                    <p>Choisis un jeu dans notre collection et invite tes amis à te rejoindre</p>
                    
                    <div class="container">
                            <ul>
                            <li><p>6+ jeux disponibles gratuitement</p></li>
                            <li><p>Partage le code de room avec tes amis</p></li>
                            <li><p>Parties illimitées sans inscription</p></li>
                            </ul>
                    </div>
                    
                       
                                ${button(null, "right-arrow-dark", null, "navigateTo", "Parcourir les jeux", "whiteButton",{path:"/games"})} 
 
                </div>
      </div>
        <p>Aucune inscription requise · Totalement gratuit · Illimité</p>
  
    </div>
    `;
}
 