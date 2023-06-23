import React, { useState, useEffect, useRef } from "react";
import ScrapButton from "./components/ScrapButton";
import axios from "axios";

function Content() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const capturing = useRef(false);
  const box = useRef(null);
  const boxStart = useRef({ x: 0, y: 0 });
  const boxEnd = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const dragEnd = useRef({ x: 0, y: 0 });
  const CHUNK_SIZE = 10000;
  const overlay = useRef(null);

  const handleCaptureClick = () => {
    capturing.current = true;
    overlay.current = document.createElement("div");
    overlay.current.style.position = "fixed";
    overlay.current.style.top = "0";
    overlay.current.style.left = "0";
    overlay.current.style.width = "100vw";
    overlay.current.style.height = "100vh";
    overlay.current.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    overlay.current.style.zIndex = "9999";
    document.body.appendChild(overlay.current);
    document.body.style.overflow = "hidden";
    handleCapture();

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e) => {
    if (!capturing.current || !overlay.current) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    boxStart.current = { x: e.pageX, y: e.pageY };
    box.current = document.createElement("div");
    box.current.style.position = "absolute";
    box.current.style.border = "0.1px solid white";
    box.current.style.left = `${boxStart.current.x}px`;
    box.current.style.top = `${boxStart.current.y}px`;
    box.current.style.backgroundColor = "rgba(200, 200, 200, 0.1)";
    box.current.style.zIndex = 99999;
    document.body.appendChild(box.current);
  };

  const handleMouseMove = (e) => {
    if (!capturing.current || !box.current) return;
    dragEnd.current = { x: e.clientX, y: e.clientY };
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
    dragEnd.current = { x: e.clientX, y: e.clientY };

    if (
      Math.abs(dragStart.current.x - dragEnd.current.x) < 1 ||
      Math.abs(dragStart.current.y - dragEnd.current.y) < 1
    ) {
      if (document.getElementById("captureCanvas")) {
        document
          .querySelector(".GyAeWb")
          .removeChild(document.getElementById("captureCanvas"));
      }
      document.body.removeChild(box.current);
      box.current = null;
      document.body.style.overflow = "auto";
      document.body.removeChild(overlay.current);
      return;
    }

    capturing.current = false;
    document.body.removeChild(box.current);
    box.current = null;
    document.body.style.overflow = "auto";
    document.body.removeChild(overlay.current);

    const canvas = document.getElementById("captureCanvas");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(
      Math.min(dragStart.current.x, dragEnd.current.x),
      Math.min(dragStart.current.y, dragEnd.current.y),
      Math.abs(dragEnd.current.x - dragStart.current.x),
      Math.abs(dragEnd.current.y - dragStart.current.y)
    );
    newCanvas2Image(imageData);
  };

  const newCanvas2Image = (imageData) => {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = imageData.width;
    newCanvas.height = imageData.height;
    const newCtx = newCanvas.getContext("2d");
    newCtx.putImageData(imageData, 0, 0);

    const dataUrl = newCanvas.toDataURL();
    document
      .querySelector(".GyAeWb")
      .removeChild(document.getElementById("captureCanvas"));

    const dataChunks = [];
    for (let i = 0; i < dataUrl.length; i += CHUNK_SIZE) {
      dataChunks.push(dataUrl.slice(i, i + CHUNK_SIZE));
    }
    const sendDataChunk = async (index) => {
      if (index >= dataChunks.length) {
        return;
      }

      const dataChunk = dataChunks[index];
      const data = {
        keyWord: document.querySelector("#APjFqb").innerHTML,
        title: document.querySelector("h3").innerText,
        texts: dataChunk,
        isLastChunk: index === dataChunks.length - 1,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/textCapture",
          data,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log(response);
        sendDataChunk(index + 1);
      } catch (error) {
        console.error(error);
      }
    };
    sendDataChunk(0);
  };

  const handleCapture = () => {
    chrome.runtime.sendMessage({ action: "capture" }, (response) => {
      const imgData = response.img;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.zIndex = 9999;
        const scrollY = window.scrollY;
        canvas.style.top = `${scrollY}px`;
        // canvas.style.left = 0;
        canvas.id = "captureCanvas";
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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
