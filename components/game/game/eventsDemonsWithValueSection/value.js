import { getTextualValueOfCard } from "../../../../src/controller/game/cards.js"
export default function statEventsDemonsWithValueSectionEventSection(gameData){
    return `
        <span>State : ${gameData.data.state.value}</span> 
        <span>Player Turn Position : ${gameData.data.currentPlayerPosition?.value}</span> 
        <span>Tour : ${gameData.data.tou}</span> 
        <span>Manche : ${gameData.data.manche}</span> 
        <span>All player has played : ${gameData.data.allPlayersHasPlayed.value}</span> 
        <span>Winners : ${gameData.data?.winners?.value.map(winner => winner.pseudo).join(", ")}</span> 
       
        <span>Board Card : ${gameData.data.boardCard.value.map(card => getTextualValueOfCard(card)).join(", ")}</span> 
        <span>Deck : ${gameData.data.deck.value.map(cardId => getTextualValueOfCard(gameData.data.cards[cardId])).join(", ")}</span> 
        <span>Discard : ${gameData.data.discardDeck.value.map(cardId => getTextualValueOfCard(gameData.data.cards[cardId])).join(", ")}</span> 
        ${Object.keys(gameData.data.groupPot.value).map(gainId => `<span>${gameData.data.gains.find(elt=>elt.id == gainId)?.name} : ${gameData.data.groupPot.value[gainId].value}</span>`).join("")}
        ${Object.keys(gameData.data.globalValueStatic).map(key => `<span>${key} : ${gameData.data.globalValueStatic[key].value}</span>`).join("")}
        ${Object.keys(gameData.roomInDb.globalValue).map(key => `<span>${key} : ${gameData.data[key].value}</span>`).join("")}
        
   `
}
