function getSite() {
    return window.location.hostname;
}

function getURL() {
    return window.location.href;
}

console.log("Current site:", getSite());
console.log("Current URL:", getURL());

chrome.runtime.onMessage.addListener((request) => {
    console.log('Received message in background.js:', request);
    if (request.type !== 'URL_CHANGE') return;
    console.log('Received URL_CHANGE message for tabId', request.tabId);
});
