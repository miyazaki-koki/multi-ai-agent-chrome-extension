// Content Script - Runs on web pages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageContent') {
          const content = {title: document.title, url: window.location.href, contentLength: document.body.innerText.length};
          sendResponse({success: true, content});
    } else if (request.action === 'highlightElement') {
          const el = document.querySelector(request.selector);
          if (el) el.style.border = '2px solid #667eea';
          sendResponse({success: true});
    }
});

const observer = new MutationObserver((mutations) => {
    // Monitor page changes
});

observer.observe(document.body, {childList: true, subtree: true});
console.log('Content script loaded');
