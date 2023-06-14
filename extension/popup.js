const HOMEPAGE_ADDR = "http://localhost:3000";

let innerMessage = "스크랩하려면 로그인해주세요.";
let buttonLink = HOMEPAGE_ADDR;
let buttonText = "로그인 하러가기";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateToken") {
    if (message.token) {
      innerMessage = "환영합니다 ㅇㅇㅇ님!";
      buttonLink = HOMEPAGE_ADDR + "/storage";
      buttonText = "보관함 바로가기";
    } else {
      innerMessage = "스크랩하려면 로그인해주세요.";
      buttonLink = HOMEPAGE_ADDR;
      buttonText = "로그인 하러가기";
    }
  }
  document.querySelector("#welcome-message").innerText = innerMessage;
  document.querySelector("#link-btn").innerText = buttonText;
});

chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
  if (response.accessToken) {
    innerMessage = "환영합니다 ㅇㅇㅇ님!";
    buttonLink = HOMEPAGE_ADDR + "/storage";
    buttonText = "보관함 가기";
  }
  document.querySelector("#welcome-message").innerText = innerMessage;
  document.querySelector("#link-btn").innerText = buttonText;
  document.querySelector("#link-btn").addEventListener("click", function () {
    chrome.tabs.create({ url: buttonLink });
  });
});



