// Settings Page Script
document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();

                                                            const claudeKey = document.getElementById('claude-key').value;
    const openaiKey = document.getElementById('openai-key').value;
    const statusEl = document.getElementById('status-message');

                                                            if (!claudeKey) {
                                                                  showStatus('Claude API key is required', 'error');
                                                                  return;
                                                            }

                                                            // Save to Chrome storage
                                                            chrome.storage.sync.set({
                                                                  apiKeys: {
                                                                          claude: claudeKey,
                                                                          openai: openaiKey
                                                                  }
                                                            }, () => {
                                                                  showStatus('Settings saved successfully!', 'success');
                                                                  setTimeout(() => statusEl.classList.remove('show'), 3000);
                                                            });
});

// Load saved settings
function loadSettings() {
    chrome.storage.sync.get(['apiKeys'], (result) => {
          if (result.apiKeys) {
                  if (result.apiKeys.claude) {
                            document.getElementById('claude-key').value = result.apiKeys.claude;
                  }
                  if (result.apiKeys.openai) {
                            document.getElementById('openai-key').value = result.apiKeys.openai;
                  }
          }
    });
}

function showStatus(message, type) {
    const statusEl = document.getElementById('status-message');
    statusEl.textContent = message;
    statusEl.className = `status ${type} show`;
}

// Load on page load
loadSettings();
