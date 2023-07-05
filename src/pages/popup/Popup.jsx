import React, { useState, useEffect } from "react";
import { HOMEPAGE_ADDR, SERVER_ADDR } from "/utils/env";
import LaunchIcon from "@mui/icons-material/Launch";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

const Popup = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState("");

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
          console.error(error);
        }
      };
      getUserName(accessToken);
    }
  }, [accessToken]);

  const btnSytle = {
    fontWeight: "600",
    textAlign: "center",
    lineHeight: "30px",
    color: "#FFF",
    borderWidth: "0",
    borderRadius: "5px",
    transition: "all 0.2s",
    backgroundColor: "#f87171",
    "&:hover": {
      backgroundColor: "#ef4444",
    },
    "&:focus": {
      outlineWidth: "4px",
      outlineColor: "#fca5a5",
    },
    fontSize: "15px",
    padding: "10px 25px",
    cursor: "pointer",
    width: "fit-content",
    alignSelf: "center",
  };

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Product Sans', sans-serif",
        padding: "20px",
      }}
    >
      <header
        style={{
          fontWeight: "600",
          textAlign: "center",
          marginLeft: "-0.5rem",
          marginBottom: "1rem",
          whiteSpace: "nowrap",
          fontSize: "35px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <img alt="logo" style={{ height: "60px", verticalAlign: "top" }} src="icon.png" />
        <div
          style={{
            filter: "drop-shadow(rgba(0, 0, 0, 0.04) 0px 10px 8px) drop-shadow(rgba(0, 0, 0, 0.05) 0px 4px 3px)",
          }}
        >
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#000" }}>ing Helper</span>
        </div>
        <p style={{ fontWeight: "400px", fontSize: "12px", color: "#adb5bd" }}>v 1.0.5</p>
      </header>

      <p style={{ textAlign: "center", fontSize: "18px" }}>
        {accessToken ? `환영합니다 ${userName}님!` : "스크랩하려면 로그인해주세요."}
      </p>
      <button
        style={btnSytle}
        onClick={() => {
          gotoHomepage(HOMEPAGE_ADDR);
        }}
      >
        {accessToken ? "보관함 바로가기" : "로그인 하러가기"}
        <BookmarksIcon style={{ verticalAlign: "top", padding: "2px 0 0 3px" }} />
      </button>
    </div>
  );
};

export default Popup;
