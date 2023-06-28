import React, { useState, useEffect, useRef } from "react";
import ScrapButton from "./components/ScrapButton";
import setPreviewAttributes from "./utils/setPreviewAttributes";
import Shortcuts from "./components/Shortcuts";
import axios from "axios";
import { SERVER_ADDR } from "/utils/env";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import moveFocusBox from "./utils/moveFocusBox";
import alertSweetBeum from "./utils/alertSweetBeum";

function Content() {
  const previousContainer = useRef(null);
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
      console.log("스크랩", accessToken);

      axios({
        url: `${SERVER_ADDR}/api/saveScrap`,
        method: "post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      })
        .then((response) => {
          // alert("스크랩 완료");
          alertSweetBeum("성공","링크");

        })
        .catch((error) => {
          // alert("스크랩 실패", error);
        alertSweetBeum("실패","링크");

        });
      setScrapButtonClicked(false);
    }
  }, [scrapButtonClicked, accessToken, previewUrl]);

  const toggleToolBtns = (power) => {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.style.display = power === "off" ? "none" : "";
    });
  };

  const handleMouseDown = (e) => {
    if (!capturing.current || !overlay.current) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    boxStart.current = { x: e.pageX, y: e.pageY };
    box.current = document.createElement("div");
    if (type === "image") {
      Object.assign(box.current.style, {
        position: "absolute",
        border: "0.1px solid blue",
        left: `${boxStart.current.x}px`,
        top: `${boxStart.current.y}px`,
        backgroundColor: "rgba(0, 0, 128, 0.1)",
        zIndex: 99999,
        brightness: 125,
      });
    } else {
      Object.assign(box.current.style, {
        position: "absolute",
        border: "0.1px solid green",
        left: `${boxStart.current.x}px`,
        top: `${boxStart.current.y}px`,
        backgroundColor: "rgba(0, 128, 0, 0.1)",
        zIndex: 99999,
        brightness: 125,
      });
    }
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
      toggleToolBtns("on");
      return;
    }

    capturing.current = false;
    document.body.removeChild(box.current);
    box.current = null;
    document.body.style.overflow = "auto";
    document.body.removeChild(overlay.current);
    toggleToolBtns("on");

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
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    });
  };

  const sendImage = async (formData) => {
    const path = type === "image" ? "imgCapture" : "textCapture";
    const alertType = type === "image" ? "이미지" : "텍스트";
    try {
      const response = await axios.post(`${SERVER_ADDR}/api/${path}`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // alert("스크랩 완료");
      alertSweetBeum("성공",alertType);
      console.log(response);
    } catch (error) {
      // alert("스크랩 실패");
      alertSweetBeum("실패",alertType);
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
      const [url, title] = await setPreviewAttributes(e, 700, "mouse");
      if (url && url !== document.querySelector("#previewer").src) {
        moveFocusBox(previousContainer, e.target, false);
        setPreviewUrl(url);
        setPreviewTitle(title);
      }
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
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (document.activeElement?.tagName === "TEXTAREA") return;

      if (e.code === "KeyT" || e.code === "KeyC" || e.code === "Space") {
        console.log("keyPress", accessToken);
        e.preventDefault();
        e.code === "KeyT"
          ? handleCapture("text")
          : e.code === "KeyC"
          ? handleCapture("image")
          : setScrapButtonClicked(true);
      }
    };

    const handleCapture = (captureType) => {
      console.log("handleCapture", accessToken);
      if (capturing.current) return;
      capturing.current = true;
      type = captureType;
      capture();
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [accessToken]);
  return (
    <>
      <Shortcuts
        setPreviewUrl={setPreviewUrl}
        // handleCapture={handleCapture}
        setScrapButtonClicked={setScrapButtonClicked}
        setPreviewTitle={setPreviewTitle}
        previousContainer={previousContainer}
      />
      <div id="previewer-container">
        <iframe id="previewer" title={previewTitle} src={previewUrl}></iframe>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "0px",
            right: "10px",
          }}
        >
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
                // onClick={() => {
                //   handleCapture("text");
                // }}
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
                // onClick={() => {
                //   handleCapture("image");
                // }}
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
