import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

switch (window.location.origin) {
  case "https://search.naver.com":
    const subPack = document.querySelector("#sub_pack");
    subPack!.append(rootElement);
    break;
}


const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
