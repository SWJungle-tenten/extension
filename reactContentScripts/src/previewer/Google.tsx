// @ts-nocheck
import React, { useState, useEffect } from "react";
import ScrapButton from "../components/ScrapButton";
import handlePreviewEvent from "../util/handlePreviewEvent";
import Shortcuts from "../components/Shortcuts";

function Google() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  document.addEventListener(
    "mouseover",
    async (e) => {
      setPreviewUrl(await handlePreviewEvent(e, 700));
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
      <Shortcuts setPreviewUrl={setPreviewUrl} />
      {accessToken && <ScrapButton accessToken={accessToken} />}
      <div
        style={{
          width: "40vw",
          marginLeft: "35px",
          marginTop: "-30px",
          height: "78vh",
          top: "72px",
          position: "sticky",
        }}
      >
        <iframe id="previewer" title="previewer" src={previewUrl} style={{ width: "100%", height: "100%" }}></iframe>
      </div>
    </>
  );
}

export default Google;
