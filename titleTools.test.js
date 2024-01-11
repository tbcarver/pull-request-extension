const { formatPrTitle, getJiraTicketId } = require('./titleTools');

test('formats PR title correctly', () => {
  expect(formatPrTitle('epic recom 690/split payments')).toBe('RECOM-690 Split payments');
  expect(formatPrTitle('epic-recom 690/split payments')).toBe('RECOM-690 Split payments');
  expect(formatPrTitle('recom 690/split payments')).toBe('RECOM-690 Split payments');
  expect(formatPrTitle('recom 690-split payments')).toBe('RECOM-690 Split payments');
  expect(formatPrTitle('recom 690 split payments')).toBe('RECOM-690 Split payments');
  expect(formatPrTitle('recom/RECOM-690 split payments')).toBe('RECOM-690 Split payments');
  expect(formatPrTitle('RECOM-690 split payments')).toBe('RECOM-690 Split payments');
  expect(formatPrTitle('hot fix split payments')).toBe('hot fix split payments');
  expect(formatPrTitle('epic recom 690/10-split payments')).toBe('RECOM-690 10-split payments');
});

test('gets jira ticket id title correctly', () => {
  expect(getJiraTicketId('RECOM-690 Split payments')).toBe('RECOM-690');
  expect(getJiraTicketId('epic-recom 690/split payments')).toBe(null);
});
