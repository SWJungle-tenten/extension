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
  const topSnippet = document.querySelector(".M8OgIe") || document.querySelector(".XqFnDf");

  if (topSnippet || rightSide) {
    const wrapper = document.createElement("div");
    wrapper.className = "content-warpper";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";

    const leftSide = document.querySelector("#center_col");
    wrapper.appendChild(leftSide);
    if (rightSide) {
      rightSide.style.display = "none";
    }
    wrapper.appendChild(rootElement);
    body.appendChild(wrapper);
  } else {
    body.append(rootElement);
    body.style.flexWrap = "nowrap";
  }
  document.querySelector("#center_col").style.marginLeft = "40px";
  document.querySelector("#appbar").style.paddingLeft = "40px";

  return <Content />;
};

root.render(<React.StrictMode>{selectRoot()}</React.StrictMode>);
