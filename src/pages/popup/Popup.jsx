import React, { useState, useEffect } from "react";
import { HOMEPAGE_ADDR, SERVER_ADDR } from "../../../utils/env";

const Popup = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState(null);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateToken") {
      setAccessToken(message.accessToken);
    }
  });

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
      setAccessToken(response.accessToken);
    });
  }, [setAccessToken]);

  const gotoHomepage = (url) => {
    chrome.tabs.create({ url });
  };

  useEffect(() => {
    if (accessToken) {
      const getUserName = async (accessToken) => {
        try {
          const response = await fetch(`${SERVER_ADDR}/api/giveUserName`, {
            method: "post",
            headers: new Headers({
              Authorization: `Bearer ${accessToken}`,
            }),
          });
          const data = await response.json();
          setUserName(data.username);
        } catch (error) {
          console.log(error);
        }
      };
      getUserName(accessToken);
    }
  }, [accessToken]);

  return (
    <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
      <p>{accessToken ? `환영합니다 ${userName}님!` : "스크랩하려면 로그인해주세요."}</p>
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
