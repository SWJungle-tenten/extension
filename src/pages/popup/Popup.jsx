import React, { useState } from "react";

const Popup = () => {
  const HOMEPAGE_ADDR = `http://localhost:3000`;
  const [accessToken, setAccessToken] = useState(null);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateToken") {
      setAccessToken(message.accessToken);
      // if (message.accessToken) {
      //   innerMessage = "환영합니다 ㅇㅇㅇ님!";
      //   buttonLink = HOMEPAGE_ADDR + "/storage";
      //   buttonText = "보관함 바로가기";
      // } else {
      //   innerMessage = "스크랩하려면 로그인해주세요.";
      //   buttonLink = HOMEPAGE_ADDR;
      //   buttonText = "로그인 하러가기";
      // }
    }
    // document.querySelector("#welcome-message").innerText = innerMessage;
    // document.querySelector("#link-btn").innerText = buttonText;
  });

  chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
    setAccessToken(response.accessToken);
    // if (response.accessToken) {
    //   innerMessage = "환영합니다 ㅇㅇㅇ님!";
    //   buttonLink = HOMEPAGE_ADDR + "/storage";
    //   buttonText = "보관함 가기";
    // }
    // document.querySelector("#welcome-message").innerText = innerMessage;
    // document.querySelector("#link-btn").innerText = buttonText;
    // document.querySelector("#link-btn").addEventListener("click", function () {});
  });

  const gotoHomepage = (url) => {
    chrome.tabs.create({ url });
  };

  return (
    <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
      <p>{accessToken ? "환영합니다 ㅇㅇㅇ님!" : "스크랩하려면 로그인해주세요."}</p>
      {accessToken ? (
        <button
          onClick={() => {
            gotoHomepage(HOMEPAGE_ADDR + "/storage");
          }}
        >
          보관함 가기
        </button>
      ) : (
        <button
          onClick={() => {
            gotoHomepage(HOMEPAGE_ADDR);
          }}
        >
          로그인 하러가기
        </button>
      )}
    </div>
  );
};

export default Popup;
