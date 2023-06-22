import React, { useState, useEffect, useRef } from "react";
import ScrapButton from "./components/ScrapButton";
import axios from "axios";

function Content() {
  const [scrapButton, setScrapButton] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const capturing = useRef(false);
  const box = useRef(null);
  const start = useRef({ x: 0, y: 0 });
  const end = useRef({ x: 0, y: 0 });

  const handleCaptureClick = () => {
    capturing.current = true;
    
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!capturing.current) return;
      start.current = { x: e.pageX, y: e.pageY };
      console.log("x , y" , { x: e.clientX, y: e.clientY })

      box.current = document.createElement("div");
      box.current.style.position = "absolute";
      box.current.style.border = "1px solid #ff8080";
      box.current.style.left = `${start.current.x}px`;
      box.current.style.top = `${start.current.y}px`;
      document.body.appendChild(box.current);
    };

    const handleMouseMove = (e) => {
      if (!capturing.current) return;
      end.current = { x: e.clientX, y: e.clientY };
      box.current.style.width = `${Math.abs(end.current.x - start.current.x)}px`;
      box.current.style.height = `${Math.abs(end.current.y - start.current.y)}px`;
      box.current.style.left = `${Math.min(start.current.x, end.current.x)}px`;
      box.current.style.top = `${Math.min(start.current.y, end.current.y)}px`;
    };

    const handleMouseUp = (e) => {
      if (!capturing.current) return;

      capturing.current = false;
      end.current = { x: e.clientX, y: e.clientY };
      handleCapture();

      document.body.removeChild(box.current);
      box.current = null;
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  
  const handleCapture = () => {
    chrome.runtime.sendMessage({ action: "capture" }, (response) => {
      const imgData = response.img;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // 드래그 영역에 대한 정보
        const width = Math.abs(end.current.x - start.current.x);
        const height = Math.abs(end.current.y - start.current.y);
        const x = Math.min(start.current.x, end.current.x);
        const y = Math.min(start.current.y, end.current.y);
  
        // Canvas 크기 설정
        canvas.width = width-1;
        canvas.height = height-1;
  
        // 이미지를 canvas에 그리고, 드래그 영역만 잘라냄
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  
        // 잘라낸 영역을 다시 data URL로 변환
        const dataUrl = canvas.toDataURL();
        console.log("dataUrl", dataUrl);
  
        // 이후 필요한 작업 수행 (예: 서버로 이미지 전송)
      };
      img.src = imgData;
    });
  };

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
              console.log("response", response);
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
        <div
          style={{
            marginLeft: "35px",
            marginTop: "30px",
            position: "sticky",
          }}
        >
          <button onClick={handleCaptureClick}>Screen Capture</button>
        </div>
      </div>
    </>
  );
}

export default Content;
