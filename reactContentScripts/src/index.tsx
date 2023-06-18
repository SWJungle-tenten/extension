// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import Naver from "./previewer/Naver";
import Google from "./previewer/Google";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
const root = ReactDOM.createRoot(rootElement);

const curOrigin = window.location.origin;
const curPathname = window.location.pathname;

const changeDomainComponent = () => {
  if (curOrigin === "https://search.naver.com") {
    document.querySelector("#sub_pack").append(rootElement);
    return <Naver />;
  } else if (curOrigin + curPathname === "https://www.google.com/search") {
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
    return <Google />;
  } else {
    console.log("nothing matched");
  }
};

root.render(<React.StrictMode>{changeDomainComponent()}</React.StrictMode>);
