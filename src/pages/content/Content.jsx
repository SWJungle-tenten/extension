import React, { useState, useEffect } from "react";
import ScrapButton from "./components/ScrapButton";
import handlePreviewEvent from "./utils/handlePreviewEvent";
import Shortcuts from "./components/Shortcuts";

function Content() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  document.addEventListener(
    "mouseover",
    async (e) => {
      const [url, title] = await handlePreviewEvent(e, 500);
      setPreviewUrl(url);
      setPreviewTitle(title);
    },
    { capture: true }
  );

  useEffect(() => {
    chrome.runtime?.sendMessage({ action: "getToken" }, (response) => {
      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }
    });
  }, []);

  chrome.runtime?.onMessage.addListener((message, ..._) => {
    if (message.action === "updateToken" && !message.variable) {
      setAccessToken(message.accessToken);
    }
  });

  return (
    <>
      <Shortcuts setPreviewUrl={setPreviewUrl} />

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
        <iframe id="previewer" title={previewTitle} src={previewUrl} style={{ width: "100%", height: "100%" }}></iframe>
        {accessToken && previewUrl && <ScrapButton accessToken={accessToken} />}
      </div>
    </>
  );
}

export default Content;
