let isActive = false;

global.browser = require('webextension-polyfill');

/*
 * Update icon (active/inactive)
 */
chrome.storage.sync.get('vertical', function(obj) {
  isActive = obj.vertical;

  if (isActive) {
    chrome.browserAction.setIcon({ path: './icons/icon_active_128.png' });
  } else {
    chrome.browserAction.setIcon({ path: './icons/icon_128.png' });
  }
});

/*
 * Send a message to the 'content.js' script when the user
 * presses the icon to activate or deactivate the vertical styling
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  isActive = !isActive;

  if (isActive) {
    chrome.browserAction.setIcon({ path: './icons/icon_active_128.png' });
  } else {
    chrome.browserAction.setIcon({ path: './icons/icon_128.png' });
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { vertical: isActive });
  });

  chrome.storage.sync.set({ vertical: isActive });
});
