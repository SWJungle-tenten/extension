import React, { useState, useEffect, useRef } from "react";
import ScrapButton from "./components/ScrapButton";
import Previewer from "./components/Previewer";
import MoveShortcuts from "./components/MoveShortcuts";
import CaptureButtons from "./components/CaptureButtons";

function Content() {
  const [accessToken, setAccessToken] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(null);
  const previousContainer = useRef(null);

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
      <MoveShortcuts
        setPreviewUrl={setPreviewUrl}
        setPreviewTitle={setPreviewTitle}
        previousContainer={previousContainer}
      />
      <div id="previewer-container">
        <Previewer
          accessToken={accessToken}
          previewUrl={previewUrl}
          previewTitle={previewTitle}
          setPreviewUrl={setPreviewUrl}
          setPreviewTitle={setPreviewTitle}
          previousContainer={previousContainer}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "0px",
            right: "10px",
          }}
        >
          {accessToken && previewUrl && previewTitle !== "wrong request" && (
            <>
              <ScrapButton accessToken={accessToken} />
              <CaptureButtons accessToken={accessToken} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Content;
