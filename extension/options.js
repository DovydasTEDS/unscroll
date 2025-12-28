// Saves options to chrome.storage
const saveOptions = () => {
  const tiktok = document.getElementById('tiktok').checked;
  const ytShorts = document.getElementById('yt-shorts').checked;
  const igReels = document.getElementById('ig-reels').checked;

  chrome.storage.sync.set(
    { enabledSites: {tiktok: tiktok, ytShorts: ytShorts, igReels: igReels} },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('save');
      status.textContent = 'Saved';
      setTimeout(() => {
        status.textContent = 'Save';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { enabledSites: {tiktok: true, ytShorts: true, igReels: true} },
    (items) => {
      document.getElementById('tiktok').checked = items.enabledSites.tiktok;
      document.getElementById('yt-shorts').checked = items.enabledSites.ytShorts;
      document.getElementById('ig-reels').checked = items.enabledSites.igReels;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);