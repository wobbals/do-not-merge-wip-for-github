'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.subject === 'localStorage') {
    sendResponse({localStorage: localStorage});
  }
});

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.storage.local.get('disabled', function(result){
    if (result.disabled) {
      chrome.browserAction.setIcon({
        path: "images/steev-16-red.png",
        tabId: tab.id
      });
    } else {
      chrome.browserAction.setIcon({
        path: "images/steev-16.png",
        tabId: tab.id
      });
    }
    chrome.storage.local.set({'disabled': !result.disabled});
  });
});
