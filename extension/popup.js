const HOMEPAGE_ADDR = "http://localhost:3000";

let accessToken;
chrome.runtime.sendMessage({ action: "getVariable" }, function (response) {
  accessToken = response.accessToken;

  let innerMessage, buttonLink, buttonText;

  if (accessToken) {
    innerMessage = "환영합니다 ㅇㅇㅇ님!";
    buttonLink = HOMEPAGE_ADDR;
    buttonText = "보관함 가기";
  } else {
    innerMessage = "스크랩하려면 로그인해주세요.";
    buttonLink = HOMEPAGE_ADDR;
    buttonText = "로그인 하러가기";
  }

  document.querySelector("#welcome-message").innerText = innerMessage;
  document.querySelector("#link-btn").addEventListener("click", function () {
    chrome.tabs.create({ url: HOMEPAGE_ADDR });
  });
  document.querySelector("#link-btn").innerText = buttonText;
});
