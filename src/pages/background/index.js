import { SERVER_ADDR } from "/utils/env.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getToken") {
    chrome.cookies.get({ url: SERVER_ADDR, name: "accessToken" }).then((response) => {
      sendResponse({ accessToken: response?.value });
    });
  }
  return true;
});

chrome.cookies.onChanged.addListener(({ cause, cookie, removed }) => {
  if (cookie.name === "accessToken") {
    chrome.cookies.get({ url: SERVER_ADDR, name: "accessToken" }).then((response) => {
      chrome.runtime.sendMessage({ action: "updateToken", accessToken: response?.value });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "capture") {
      chrome.tabs.captureVisibleTab(null, {format: "png"}, (imgData) => {
          sendResponse({img: imgData});
      });
      return true; // 비동기 응답을 위해 필요함
  }
});