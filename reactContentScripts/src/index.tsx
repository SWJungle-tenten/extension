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
    const sidebar = document.querySelector(".TQc1id");
    const topSnippet = document.querySelector(".M8OgIe");
    if (sidebar) {
      sidebar.appendChild(rootElement);
    } else if (topSnippet) {
      const wrapper = document.createElement("div");
      wrapper.className = "content-warpper";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "row";

      const originLeft = document.querySelector("#center_col");
      wrapper.appendChild(originLeft);
      wrapper.appendChild(rootElement);
      // document.querySelector(".GyAeWb").replaceChild(wrapper, originLeft);
      document.querySelector(".GyAeWb").appendChild(wrapper);
    } else {
      const main = document.querySelector(".GyAeWb");
      main.append(rootElement);
      main.style.flexWrap = "nowrap";
    }
    return <Google />;
  } else {
    console.log("nothing matched");
  }
};

root.render(<React.StrictMode>{changeDomainComponent()}</React.StrictMode>);
