import React, { useState, useEffect } from "react";
import ScrapButton from "./components/ScrapButton";
import axios from "axios";

function Content() {
  const [scrapButton, setScrapButton] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
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
          (((eventTarget.className === "") & (eventTarget.id === "")) |
            (eventTarget.className === "l"))
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

  useEffect(() => {
    const mouseDownHandler = function (e) {
      if (!scrapButton) {
        return;
      }
      if (e.target !== scrapButton || selectedText === null) {
        document.body.removeChild(scrapButton);
        setScrapButton(null);
      }
    };
    
    document.addEventListener("mousedown", mouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [scrapButton, selectedText]);

  useEffect(() => {
    const mouseUpHandler = async function (e) {
      if (e.target === scrapButton || e.target === selectedText) {
        return;
      }
      const sel = document.getSelection();
      if (
        sel.isCollapsed ||
        (sel.toString().length < 6 && sel.toString().includes("\n")) ||
        sel.toString() === selectedText
      ) {
        return;
      } else {
        const direction = sel.anchorOffset - sel.focusOffset < 0;
        const divTop = direction ? e.pageY + 10 : e.pageY - 40;
        const divLeft = direction ? e.pageX + 10 : e.pageX - 40;

        const button = document.createElement("button");
        button.innerHTML = "Sub Scrap";
        button.style.position = "absolute";
        button.style.top = `${divTop}px`;
        button.style.left = `${divLeft}px`;
        document.body.appendChild(button);
        setScrapButton(button);
        setSelectedText(sel.toString());

        button.addEventListener("click", async function () {
          const data = {
            keyWord: document.querySelector("#APjFqb").innerHTML,
            url: window.location.href,
            title: document.title,
            texts: [sel.toString()],
          };

          try {
            const response = await axios.post(
              "http://localhost:8080/api/saveScrap",
              { data },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            if (response.status === 200) {
              console.log("response", response)
              button.innerHTML = "Sub Scrap Success";
              button.disabled = true;
              setTimeout(() => {
                button.style.display = "none";
              }, 1000);
            } else {
              alert("Sub Scrap Failed");
            }
          } catch (error) {
            alert("Sub Scrap Failed");
          }
        });
      }
    };

    document.addEventListener("mouseup", mouseUpHandler);
    return () => {
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [scrapButton, selectedText, accessToken]);

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
        <iframe
          id="previewer"
          title="previewer"
          src={previewUrl}
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </div>
    </>
  );
}

export default Content;
