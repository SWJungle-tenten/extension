// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import Content from "./Content";
import "./content.style.css";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
const root = ReactDOM.createRoot(rootElement);

const selectRoot = () => {
  const body = document.querySelector(".GyAeWb");
  const rightSide = document.querySelector(".TQc1id");
  const topSnippet = document.querySelector(".M8OgIe");
  if (rightSide) {
    body.removeChild(rightSide);
    body.appendChild(rootElement);
    body.style.flexWrap = "nowrap";
  } else if (topSnippet) {
    const wrapper = document.createElement("div");
    wrapper.className = "content-warpper";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";

    const leftSide = document.querySelector("#center_col");
    wrapper.appendChild(leftSide);
    wrapper.appendChild(rootElement);
    body.appendChild(wrapper);
  } else {
    body.append(rootElement);
    body.style.flexWrap = "nowrap";
  }
  return <Content />;
};

root.render(<React.StrictMode>{selectRoot()}</React.StrictMode>);
