function formatPrTitle(originalTitle) {
  const numberMatch = originalTitle.match(/\d+/);
  if (!numberMatch) return originalTitle;

  const numberIndex = numberMatch.index;
  const number = numberMatch[0];

  let beforeNumber = originalTitle.slice(0, numberIndex).trim();
  const beforeNumberMatch = beforeNumber.match(/(\w+)\W*$/);
  beforeNumber = beforeNumberMatch ? beforeNumberMatch[1].toUpperCase() : 'RECOM';

  let afterNumber = originalTitle.slice(numberIndex + number.length).trim();
  afterNumber = afterNumber.replace(/^[^\w]+/, '');
  afterNumber = afterNumber.charAt(0).toUpperCase() + afterNumber.slice(1);

  return `${beforeNumber}-${number} ${afterNumber}`;
}

function getJiraTicketId(value) {
  if (!value) {
    return;
  }

  const pattern = /\b[A-Za-z]+-\d+\b/;
  const match = value.match(pattern);
  return match ? match[0] : null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatPrTitle: formatPrTitle,
    getJiraTicketId: getJiraTicketId
  };
} else {
  window.formatPrTitle = formatPrTitle;
  window.getJiraTicketId = getJiraTicketId;
}
