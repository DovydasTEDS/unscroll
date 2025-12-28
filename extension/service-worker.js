const SITES_PATH = chrome.runtime.getURL('sites.json');
let DOOMSCROLL_SITES = [];

async function loadSitesJson() {
    try {
        const res = await fetch(SITES_PATH);
        DOOMSCROLL_SITES = await res.json();
        console.log('Loaded sites.json:', DOOMSCROLL_SITES);
    } catch (err) {
        console.error('Failed to load sites.json', err);
    }
}

function getHostname(url) {
    try {
        return new URL(url).hostname.replace(/^www\./i, '');
    } catch {
        return null;
    }
}

// async function loadSites() {
//     await loadSitesJson();
//     console.log('Doomscroll Sites Loaded:', DOOMSCROLL_SITES.sites);
//     const domains = DOOMSCROLL_SITES.sites.map(site => site.domain);
//     const urls = DOOMSCROLL_SITES.sites.map(site => site.url);
//     const codes = DOOMSCROLL_SITES.sites.map(site => site.code);
//     const types = DOOMSCROLL_SITES.sites.map(site => site.type);


//     console.log('Domains:', domains);
//     console.log('URLs:', urls);
//     console.log('Codes:', codes);
//     console.log('Types:', types);
// }

// loadSites();

loadSitesJson();

function isDoomscrollHostname(url) {
    const hostname = getHostname(url);
    console.log('Checking hostname:', hostname);
    if (!hostname) return false;

    const site = DOOMSCROLL_SITES.sites.find(({domain}) => domain === hostname)

    console.log('Matched site:', site);

    if (site.type === 'domain') {
        return [true, site];
    }

    if (site.type === 'url') {
        return [url.includes(site.url), site]
    }

    return [false, null];
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab updated:', tabId, changeInfo, tab);
    console.log('isDoomscrollSite:', isDoomscrollHostname(tab.url));
    console.log(tab.url);
    console.log(getHostname(tab.url));
    const Doomscroll = isDoomscrollHostname(tab.url);
    if (!Doomscroll) return;
    const [isDoomscroll, site] = Doomscroll;
    if (!isDoomscroll) return;
    chrome.tabs.sendMessage(tabId, { type: 'URL_CHANGE', tabId: tabId, site: site });
    console.log('Message Sent: URL_CHANGE for tabId', tabId)
});