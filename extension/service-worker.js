const SERVER_ADDR = "http://localhost:8080";

const accessToken = (async () => {
  return await chrome.cookies.get({ url: SERVER_ADDR, name: "accessToken" }).value;
})();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getVariable") {
    sendResponse({ accessToken });
  }
});
