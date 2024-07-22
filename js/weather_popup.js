const startButton = document.querySelector(".start");

chrome.storage.sync.get("buttonName", (data) => {
  if (data.buttonName) {
    let buttonName = data.buttonName;
    startButton.textContent = buttonName;
  } else {
    startButton.textContent = "Add Buttons";
  }
});

startButton.addEventListener("click", () => {
  if (startButton.textContent === "Remove Buttons") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "removeButtons" });
    });
    startButton.textContent = "Add Buttons";
    let buttonName = startButton.innerText;
    chrome.storage.sync.set({ buttonName: buttonName });
    chrome.action.setBadgeText({ text: "" });
  } else if (startButton.textContent === "Add Buttons") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "addButtons" });
    });
    startButton.textContent = "Remove Buttons";
    let buttonName = startButton.innerText;
    chrome.storage.sync.set({ buttonName: buttonName });
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#01a9e1" });
  }
});
