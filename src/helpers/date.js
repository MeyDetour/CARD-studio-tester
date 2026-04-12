/**
 * Formate une date au format d/m/y h:i
 * @param {string} date envoyée par le serveur   
 * @returns {string} La date formatée
 */
export function formatSimpleDate(dateInput) {
  const date = new Date(dateInput);

  // On vérifie si la date est valide
  if (isNaN(date.getTime())) return "Date invalide";

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date).replace(',', '');
}