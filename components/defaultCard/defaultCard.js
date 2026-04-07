export function defaultCard(card) {
 
  //  { id: "1", suit: "hearts", value: "9", faceUp: true },
 

  if (!card) {
    return "PLEASE PROVIDE CARD";
  }
  if (!card.value || !card.suit) {
    return "PLEASE PROVODE SUIT";
  }
  const getSuitColor = (suit) => {
    return suit === "hearts" || suit === "diamonds"
      ? "text-red-600"
      : "text-slate-900";
  };
  const getSuitSymbol = (suit) => {
    switch (suit) {
      case "hearts":
        return "♥";
      case "diamonds":
        return "♦";
      case "clubs":
        return "♣";
      case "spades":
        return "♠";
      default:
        return "";
    }
  };
  let suit = getSuitSymbol(card.suit);
  let color = getSuitColor(card.suit);
  return /*html */ ` 
    <div class="defaultCardOfGame ${card.hoverable ? "hoverable" : ""}">
        <span class="leftValue">${card.value}</span> 
        <span class="leftSuit ${color}">${suit}</span> 
        <span class="suit ${color}">${suit}</span> 
        <span class="rightSuit ${color}">${suit}</span> 

        <span class="rightValue">${card.value}</span> 
    </div>
    `;
}
