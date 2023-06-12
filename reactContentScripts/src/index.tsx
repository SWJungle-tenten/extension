// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import Naver from "./domain/Naver";
import Google from "./domain/Google";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
const root = ReactDOM.createRoot(rootElement);

const curOrigin = window.location.origin;
const curPathname = window.location.pathname;
// let renderTarget = null;

if (curOrigin === "https://search.naver.com") {
  console.log("detected NAVER");
  document.querySelector("#sub_pack").append(rootElement);
  root.render(
    <React.StrictMode>
      <Naver />
    </React.StrictMode>
  );
  // renderTarget = <Naver />;
} else if (curOrigin + curPathname === "https://www.google.com/search") {
  const sidebar = document.querySelector(".TQc1id rhstc4");
  if (sidebar) {
    sidebar.appendChild(rootElement);
  } else {
    const main = document.querySelector(".GyAeWb");
    main.append(rootElement);
    main.style.flexWrap = "nowrap";
  }
  console.log("detected GOOGLE");
  root.render(
    <React.StrictMode>
      <Google />
    </React.StrictMode>
  );
  // renderTarget = <Google />;
} else {
  console.log("nothing matched");
  document.querySelector("#root").append(rootElement);
  root.render(
    <React.StrictMode>
      <Google />
      <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=graphql">
        로그인 하러가기
      </a>
    </React.StrictMode>
  );
}

// root.render(
//   <React.StrictMode>
//     <renderTarget />
//   </React.StrictMode>
// );
