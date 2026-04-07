export function customCard(card) {
  //  { id: "1", suit: "hearts", value: "9", faceUp: true },

  if (!card) {
    return "PLEASE PROVIDE CARD";
  }
  if (!card.image) {
    return "PLEASE PROVIDE IMAGE";
  }
  return /*html */ ` 
    <div class="customCardOfGame ${card.hoverable ? "hoverable" : ""}">
     <img src="${card.image}" alt="Custom Card Image">
    </div>
    `;
}
