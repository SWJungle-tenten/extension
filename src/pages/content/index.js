// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import Content from "./Content";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
const root = ReactDOM.createRoot(rootElement);

const selectRoot = () => {
  const sidebar = document.querySelector(".TQc1id");
  if (sidebar) {
    sidebar.appendChild(rootElement);
  } else {
    const main = document.querySelector(".GyAeWb");
    main.append(rootElement);
    main.style.flexWrap = "nowrap";
  }
  return <Content />;
};

root.render(<React.StrictMode>{selectRoot()}</React.StrictMode>);
