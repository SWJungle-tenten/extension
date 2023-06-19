// @ts-nocheck
import React, { useState, useEffect } from "react";
import ScrapButton from "./components/ScrapButton";

function Content() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  document.addEventListener(
    "mouseover",
    (e) => {
      const eventTarget = e.target;

      setTimeout(() => {
        if (eventTarget?.className === "LC20lb MBeuO DKV0Md") {
          setPreviewUrl(eventTarget.parentElement.href);
        } else if (
          (eventTarget.tagName === "A") &
          (((eventTarget.className === "") & (eventTarget.id === "")) | (eventTarget.className === "l"))
        ) {
          setPreviewUrl(eventTarget.href);
        }
      }, 700);
    },
    { capture: true }
  );
  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }
    });
  }, []);

  chrome.runtime.onMessage.addListener((message, ..._) => {
    if (message.action === "updateToken" && !message.variable) {
      setAccessToken(message.accessToken);
    }
  });

  return (
    <>
      {accessToken && <ScrapButton accessToken={accessToken} />}
      <div
        style={{
          width: "40vw",
          marginLeft: "35px",
          marginTop: "-30px",
          height: "78vh",
          top: "60px",
          position: "sticky",
        }}
      >
        <iframe id="previewer" title="previewer" src={previewUrl} style={{ width: "100%", height: "100%" }}></iframe>
      </div>
    </>
  );
}

export default Content;
