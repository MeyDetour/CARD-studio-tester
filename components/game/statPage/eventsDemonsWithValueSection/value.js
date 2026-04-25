import { getTextualValueOfCard } from "../../../../src/controller/game/cards.js"
import { getGainIdOfGainString } from "../../../../src/helpers/string.js";
export default function statEventsDemonsWithValueSectionValueSection(gameData){
    return /*html*/ `
        <div class="statValueElement"><div class="spanTop"><span>State</span><span>String</span></div><span>${gameData.data.state.value}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Players</span><span>Player Array</span></div><span>${gameData.data.players.map(player => player.pseudo).join(", ")}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Spectators</span><span>Spectator Array</span></div><span>${gameData.data.spectators.map(player => player.pseudo).join(", ")}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Player Turn Position</span><span>Number</span></div><span>${gameData.data.currentPlayerPosition?.value}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Tour</span><span>Number</span></div><span>${gameData.data.tour}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Manche</span><span>Number</span></div><span>${gameData.data.manche}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>All player has played</span><span>Boolean</span></div><span>${gameData.data.allPlayersHasPlayed.value}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Winners</span><span>Player Array</span></div><span>${gameData.data?.winners?.value.map(winner => winner.pseudo).join(", ")}${gameData.data.winners?.value.length === 0 ? "None" : ""}</span></div>
       
        <div class="statValueElement"><div class="spanTop"><span>Board Card</span><span>Card Array</span></div><span>${gameData.data.boardCard.value.map(card => getTextualValueOfCard(card)).join(", ")}${gameData.data.boardCard?.value.length === 0 ? "None" : ""}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Deck</span><span>Card Array</span></div><span>${gameData.data.deck.value.map(cardId => getTextualValueOfCard(gameData.data.cards[cardId])).join(", ")}${gameData.data.deck?.value.length === 0 ? "None" : ""}</span></div>
        <div class="statValueElement"><div class="spanTop"><span>Discard</span><span>Card Array</span></div><span>${gameData.data.discardDeck.value.map(cardId => getTextualValueOfCard(gameData.data.cards[cardId])).join(", ")}${gameData.data.discardDeck?.value.length === 0 ? "None" : ""}</span></div>
         ${Object.keys(gameData.data.groupPot.value).map(eltString => `<div class="statValueElement"><div class="spanTop"><span>${eltString.includes("gain#") ? gameData.data.gains.find(elt=>elt.id == getGainIdOfGainString(eltString))?.name : eltString}</span><span>Number</span></div><span>${gameData.data.groupPot.value[eltString].value}</span></div>`).join("")}
        ${Object.keys(gameData.data.globalValueStatic).map(key => `<div class="statValueElement"><div class="spanTop"><span>${key}</span><span>${gameData.data.globalValueStatic[key].type}</span></div><span>${gameData.data.globalValueStatic[key].value}</span></div>`).join("")}
        ${Object.keys(gameData.roomInDb.globalValue).map(key => `<div class="statValueElement"><div class="spanTop"><span>${key}</span><span>${gameData.roomInDb.globalValue[key].type}</span></div><span>${gameData.data[key].value}</span></div>`).join("")}
        
        
   `
}
