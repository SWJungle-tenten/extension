// @ts-nocheck
import { useEffect } from "react";
import axios from "axios";

function ScrapButton({ accessToken }) {
  useEffect(() => {
    if (accessToken) {
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
              keyWord: document.querySelector("#APjFqb").innerHTML,
              url: el.querySelector("a").href,
              title: el.querySelector("h3").innerText,
            };

            const response = await axios({
              url: `http://localhost:8080/api/saveUserScrap`,
              method: "post",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              data,
            });
            if (response.status === 200) {
              event.target.innerText = "스크랩 완료";
              event.target.disabled = true;
            } else {
              alert("스크랩 실패");
            }
          }
        });
      });
    }
  }, [accessToken]);
}

export default ScrapButton;
