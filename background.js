// Service Worker - Multi-AI Agent Extension
const CONFIG = { apiKeys: {claude: null, openai: null}, defaultAgent: 'claude' };

chrome.runtime.onInstalled.addListener(() => {
    console.log('Multi-AI Agent installed');
    chrome.storage.sync.get(['apiKeys'], (result) => {
          if (result.apiKeys) CONFIG.apiKeys = result.apiKeys;
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    handleMessage(request, sender, sendResponse);
    return true;
});

async function handleMessage(request, sender, sendResponse) {
    try {
          const {action, task, query, agent} = request;
          let result;

      if (action === 'execute') {
              result = await executeTask(task, agent);
      } else if (action === 'search') {
              result = await performSearch(query, agent);
      } else if (action === 'analyze') {
              result = await analyzeCurrentPage(agent);
      } else if (action === 'setApiKey') {
              setApiKey(request.provider, request.key);
              result = {success: true};
      }

      sendResponse({success: true, result});
    } catch (error) {
          sendResponse({success: false, error: error.message});
    }
}

async function executeTask(task, agent) {
    return `AI Agent (${agent}) executed: ${task}`;
}

async function performSearch(query, agent) {
    return `Search results for: ${query}`;
}

async function analyzeCurrentPage(agent) {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    return {url: tabs[0]?.url, title: tabs[0]?.title};
}

function setApiKey(provider, key) {
    CONFIG.apiKeys[provider] = key;
    chrome.storage.sync.set({apiKeys: CONFIG.apiKeys});
}
