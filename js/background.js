chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    chrome.storage.sync.set({ buttonName: "Add Buttons" });
    chrome.action.setBadgeText({ text: "" });
  }
});
