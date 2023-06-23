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
  const boxStart = useRef({ x: 0, y: 0 });
  const boxEnd = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const end = useRef({ x: 0, y: 0 });

  const handleCaptureClick = (e) => {
    capturing.current = true;
    document.body.style.overflow = "hidden";
    handleCapture();

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e) => {
    if (!capturing.current) return;
    start.current = { x: e.clientX, y: e.clientY };
    boxStart.current = { x: e.pageX, y: e.pageY };
    box.current = document.createElement("div");
    box.current.style.position = "absolute";
    box.current.style.border = "1px solid #ff8080";
    box.current.style.left = `${boxStart.current.x}px`;
    box.current.style.top = `${boxStart.current.y}px`;
    box.current.style.backgroundColor = "rgba(255, 128, 128, 0.3)";
    box.current.style.zIndex = 99999;
    document.body.appendChild(box.current);
  };

  const handleMouseMove = (e) => {
    if (!capturing.current || !box.current) return;
    end.current = { x: e.clientX, y: e.clientY };
    boxEnd.current = { x: e.pageX, y: e.pageY };
    box.current.style.width = `${Math.abs(
      boxEnd.current.x - boxStart.current.x
    )}px`;
    box.current.style.height = `${Math.abs(
      boxEnd.current.y - boxStart.current.y
    )}px`;
    box.current.style.left = `${Math.min(
      boxStart.current.x,
      boxEnd.current.x
    )}px`;
    box.current.style.top = `${Math.min(
      boxStart.current.y,
      boxEnd.current.y
    )}px`;
  };

  const handleMouseUp = (e) => {
    if (!capturing.current) return;

    capturing.current = false;
    end.current = { x: e.clientX, y: e.clientY };

    document.body.removeChild(box.current);
    box.current = null;
    document.body.style.overflow = "auto";

    // 캡처된 이미지에서 선택된 부분을 잘라내기
    const canvas = document.getElementById("captureCanvas");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(
      Math.min(start.current.x, end.current.x),
      Math.min(start.current.y, end.current.y),
      Math.abs(end.current.x - start.current.x),
      Math.abs(end.current.y - start.current.y)
    );
    newCanvas2Image(imageData);
  };

  const CHUNK_SIZE = 1000; // 청크 크기 설정. 실제 상황에 따라 조절이 필요합니다.

  const newCanvas2Image = (imageData) => {
    // 새로운 캔버스를 만들고 잘라낸 이미지를 그립니다.
    const newCanvas = document.createElement("canvas");
    newCanvas.width = imageData.width;
    newCanvas.height = imageData.height;
    const newCtx = newCanvas.getContext("2d");
    newCtx.putImageData(imageData, 0, 0);
  
    // 잘라낸 영역을 데이터 URL로 변환합니다.
    const dataUrl = newCanvas.toDataURL();
    document
      .querySelector(".GyAeWb")
      .removeChild(document.getElementById("captureCanvas"));
  
    // 데이터를 청크로 나눕니다.
    const dataChunks = [];
    for (let i = 0; i < dataUrl.length; i += CHUNK_SIZE) {
      dataChunks.push(dataUrl.slice(i, i + CHUNK_SIZE));
    }
  
    // 각 청크를 서버로 순차적으로 보냅니다.
    const sendDataChunk = async(index) => {
      if (index >= dataChunks.length) {
        return;
      }
  
      const dataChunk = dataChunks[index];
      const data = {
        keyWord: document.querySelector("#APjFqb").innerHTML,
        title: document.querySelector("h3").innerText,
        texts: dataChunk,
        isLastChunk: index === dataChunks.length - 1 // 마지막 청크인지 확인
      };
      console.log("data",data);
      console.log("chunk",dataChunk)
      try {
        const response = await axios.post(
          "http://localhost:8080/api/textCapture",
          { data },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
  
        console.log(response);
  
        // 다음 청크를 보냅니다.
        sendDataChunk(index + 1);
      } catch (error) {
        console.error(error);
      }
    };
  
    sendDataChunk(0); // 첫 번째 청크를 보냅니다.
  };

  const handleCapture = () => {
    chrome.runtime.sendMessage({ action: "capture" }, (response) => {
      const imgData = response.img;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.zIndex = 99995;
        const scrollY = window.scrollY;
        canvas.style.top = `${scrollY}px`;
        canvas.style.left = 0;
        canvas.id = "captureCanvas";
        const ctx = canvas.getContext("2d");

        // Canvas 크기 설정
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 이미지를 canvas에 그리기
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        document.querySelector(".GyAeWb").appendChild(canvas);
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
        id="previewer-container"
        style={{
          width: "40vw",
          marginLeft: "35px",
          marginTop: "-30px",
          height: "78vh",
          top: "60px",
          position: "sticky",
          zIndex: "1px",
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
            marginTop: "-700px",
            position: "sticky",
            zIndex: "100",
          }}
        >
          <button onClick={handleCaptureClick}>Screen Capture</button>
        </div>
      </div>
    </>
  );
}

export default Content;
