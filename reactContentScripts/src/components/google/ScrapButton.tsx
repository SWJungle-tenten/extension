// @ts-nocheck
import { useEffect } from "react";
import axios from "axios";

function ScrapButton() {
  useEffect(() => {
    const hyperlinks = document.querySelectorAll(".yuRUbf");

    hyperlinks.forEach((el) => {
      const button = document.createElement("button");
      button.textContent = "스크랩";
      button.className = "scrap-btn";
      button.style.position = "relative";
      button.style.bottom = "6px";
      button.style.marginLeft = "15px";
      button.style.alignSelf = "flex-end";

      el.style.display = "flex";
      el.appendChild(button);

      el.addEventListener("click", async (event) => {
        if (event.target.className === "scrap-btn") {
          event.stopPropagation();
          event.preventDefault();

          const data = {
            url: el.querySelector("a").href,
            title: el.querySelector("h3").innerText,
            userToken: "cofla",
            keyWord: document.querySelector("#APjFqb").innerHTML,
          };

          const response = await axios({ url: `${process.env.SERVER_ADDR}/saveUserScrap`, method: "post", data });
          if (response.status === 200) {
            event.target.innerText = "스크랩 완료";
            event.target.disabled = true;
          } else {
            alert("스크랩 실패");
          }
        }
      });
    });
  }, []);
  return null;
}

export default ScrapButton;
