console.log('Fashionphile PR Prep extension loaded');

const jiraTitlePattern = /\(If Different from PR Title\):/;

function isPrPage() {
  return document.getElementById('pull_request_title') !== null;
}

function updatePr() {
  const title = updatePrTitle();
  updatePrDescription(title);
}

function updatePrTitle() {
  const titleInput = document.getElementById('pull_request_title');
  if (titleInput) {
    const oldTitle = titleInput.value;
    const formattedTitle = formatPrTitle(oldTitle);

    titleInput.value = formatPrTitle(formattedTitle);
    console.log('Updated PR title to: ' + formattedTitle);

    return formattedTitle;
  }
}

function updatePrDescription(title) {
  const jiraTicketId = getJiraTicketId(title);
  console.log('Jira ticket id: ' + jiraTicketId);

  if (jiraTicketId) {
    const textarea = document.getElementById('pull_request_body');
    if (textarea) {
      const jiraLinkPattern = new RegExp(`https://fashionphile.atlassian.net/browse/${jiraTicketId}`);
      if (textarea.value.match(jiraLinkPattern)) {
        return;
      }

      const jiraLink = `https://fashionphile.atlassian.net/browse/${jiraTicketId}`;
      if (textarea.value.match(jiraTitlePattern)) {
        textarea.value = textarea.value.replace(jiraTitlePattern, jiraLink);
      } else {
        textarea.value += `\n${jiraLink}`;
      }

      console.log('Jira ticket link added: ' + jiraLink);
    }
  }
}

const observer = new MutationObserver(mutations => {
  console.log('PR MutationObserver');
  for (let mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      if (isPrPage()) {
        updatePr();
      }
    }
  }
});

const config = { childList: true, subtree: true };
const targetNode = document.body;

observer.observe(targetNode, config);
