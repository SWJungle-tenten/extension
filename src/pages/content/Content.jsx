import React, { useState, useEffect, useRef } from "react";
import ScrapButton from "./components/ScrapButton";
import handlePreviewEvent from "./utils/handlePreviewEvent";
import Shortcuts from "./components/Shortcuts";
import axios from "axios";
import { SERVER_ADDR } from "/utils/env";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function Content() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const capturing = useRef(false);
  const box = useRef(null);
  const boxStart = useRef({ x: 0, y: 0 });
  const boxEnd = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const dragEnd = useRef({ x: 0, y: 0 });
  const overlay = useRef(null);
  const [scrapButtonClicked, setScrapButtonClicked] = useState(false);
  let type = null;

  useEffect(() => {
    if (scrapButtonClicked && accessToken && previewUrl) {
      const iframe = document.querySelector("#previewer");
      const data = {
        keyWord: document.querySelector("#APjFqb").innerHTML,
        url: iframe.src,
        title: iframe.title,
      };

      axios({
        url: `${SERVER_ADDR}/saveScrap`,
        method: "post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert("스크랩 실패", error);
        });
      setScrapButtonClicked(false);
    }
  }, [scrapButtonClicked, accessToken, previewUrl]);

  const toggleToolBtns = (power) => {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.style.display = power === "off" ? "none" : "";
    });
  };
  const handleCapture = (captureType) => {
    capturing.current = true;
    type = captureType;
    capture();
  };

  const handleMouseDown = (e) => {
    if (!capturing.current || !overlay.current) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    boxStart.current = { x: e.pageX, y: e.pageY };
    box.current = document.createElement("div");
    Object.assign(box.current.style, {
      position: "absolute",
      border: "0.1px solid white",
      left: `${boxStart.current.x}px`,
      top: `${boxStart.current.y}px`,
      backgroundColor: "rgba(200, 200, 200, 0.1)",
      zIndex: 99999,
    });
    document.body.appendChild(box.current);
  };

  const handleMouseMove = (e) => {
    if (!capturing.current || !box.current) return;
    dragEnd.current = { x: e.clientX, y: e.clientY };
    boxEnd.current = { x: e.pageX, y: e.pageY };
    Object.assign(box.current.style, {
      width: `${Math.abs(boxEnd.current.x - boxStart.current.x)}px`,
      height: `${Math.abs(boxEnd.current.y - boxStart.current.y)}px`,
      left: `${Math.min(boxStart.current.x, boxEnd.current.x)}px`,
      top: `${Math.min(boxStart.current.y, boxEnd.current.y)}px`,
    });
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
        document.querySelector(".GyAeWb").removeChild(document.getElementById("captureCanvas"));
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

  const newCanvas2Image = async (imageData) => {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = imageData.width;
    newCanvas.height = imageData.height;
    const newCtx = newCanvas.getContext("2d");
    newCtx.putImageData(imageData, 0, 0);

    document.querySelector(".GyAeWb").removeChild(document.getElementById("captureCanvas"));

    newCanvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("keyWord", document.querySelector("#APjFqb").innerHTML);
      formData.append("title", document.querySelector("#previewer").title);
      formData.append("url", document.querySelector("#previewer").src);

      sendImage(formData);
      toggleToolBtns("on");
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    });
  };

  const sendImage = async (formData) => {
    const path = type === "image" ? "imgCapture" : "textCapture";
    try {
      const response = await axios.post(`${SERVER_ADDR}/api/${path}`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const capture = () => {
    toggleToolBtns("off");
    chrome.runtime.sendMessage({ action: "capture" }, (response) => {
      const imgData = response.img;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        Object.assign(canvas.style, {
          position: "absolute",
          zIndex: "9999",
          top: `${window.scrollY}px`,
        });
        canvas.id = "captureCanvas";
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        document.querySelector(".GyAeWb").appendChild(canvas);
        overlay.current = document.createElement("div");
        Object.assign(overlay.current.style, {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: "9999",
          cursor: "crosshair",
        });
        document.body.appendChild(overlay.current);
        document.body.style.overflow = "hidden";

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      };
      img.src = imgData;
    });
  };

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
      <Shortcuts
        setPreviewUrl={setPreviewUrl}
        handleCapture={handleCapture}
        setScrapButtonClicked={setScrapButtonClicked}
        setPreviewTitle={setPreviewTitle}
      />
      <div id="previewer-container">
        <iframe id="previewer" title={previewTitle} src={previewUrl} style={{ width: "100%", height: "100%" }}></iframe>
        <div style={{ display: "flex", flexDirection: "column", position: "absolute", top: "0px", right: "10px" }}>
          {accessToken && previewUrl && (
            <>
              <ScrapButton accessToken={accessToken} />
              <button
                className="btn"
                title="텍스트 스크랩"
                style={{
                  "--btn-color": "var(--green-400)",
                  "--btn-focus-color": "var(--green-300)",
                }}
                onClick={() => {
                  handleCapture("text");
                }}
              >
                <PostAddIcon />
              </button>
              <button
                className="btn"
                title="이미지 스크랩"
                style={{
                  "--btn-color": "var(--blue-400)",
                  "--btn-focus-color": "var(--blue-300)",
                }}
                onClick={() => {
                  handleCapture("image");
                }}
              >
                <AddPhotoAlternateIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Content;
