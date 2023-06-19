const HOMEPAGE_ADDR = "http://localhost:3000";

let innerMessage = "스크랩하려면 로그인해주세요.";
let buttonLink = HOMEPAGE_ADDR;
let buttonText = "로그인 하러가기";

let userName;

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "updateToken") {
    if (message.accessToken) {
      userName = await getUserName(message.accessToken);
      innerMessage = `환영합니다 ${userName}님!`;
      buttonLink = HOMEPAGE_ADDR + "/storage";
      buttonText = "보관함 바로가기";
    } else {
      userName = "";
      innerMessage = "스크랩하려면 로그인해주세요.";
      buttonLink = HOMEPAGE_ADDR;
      buttonText = "로그인 하러가기";
    }
  }
  document.querySelector("#welcome-message").innerText = innerMessage;
  document.querySelector("#link-btn").innerText = buttonText;
});

chrome.runtime.sendMessage({ action: "getToken" }, async (response) => {
  if (response.accessToken) {
    userName = await getUserName(response.accessToken);
    innerMessage = `환영합니다 ${userName}님!`;
    buttonLink = HOMEPAGE_ADDR + "/storage";
    buttonText = "보관함 가기";
  } else {
    userName = "";
    innerMessage = "스크랩하려면 로그인해주세요.";
    buttonLink = HOMEPAGE_ADDR;
    buttonText = "로그인 하러가기";
  }
  document.querySelector("#welcome-message").innerText = innerMessage;
  document.querySelector("#link-btn").innerText = buttonText;
  document.querySelector("#link-btn").addEventListener("click", function () {
    chrome.tabs.create({ url: buttonLink });
  });
});

const getUserName = async (accessToken) => {
  try {
    const response = await fetch(`http://localhost:8080/api/giveUserName`, {
      method: "post",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });
    const data = await response.json();
    return data.username;
  } catch (error) {
    console.log(error);
  }
};

