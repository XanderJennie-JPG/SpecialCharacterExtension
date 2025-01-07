chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ shortcuts: {} }, () => {
      console.log("Default shortcuts initialized.");
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getShortcuts") {
      chrome.storage.sync.get("shortcuts", (data) => {
        sendResponse({ shortcuts: data.shortcuts });
      });
      return true; // Keeps the sendResponse channel open for async calls.
    }
  });
  