export function getTextualValueOfCard(card) {
  if (!card) {
    return "No Card";
  }
  if (card.type == "french_standard") {
    let symbol = (card) => {
      switch (card.addedAttributs.couleur) {
        case "coeur":
          return "♥";
        case "carreau":
          return "♦";
        case "trefle":
          return "♣";
        case "pique":
          return "♠";
        default:
          return "";
      }
    };
    return `${card.value}${symbol(card)}`;
  }else{
    return "Unknown Card";
  }
}
