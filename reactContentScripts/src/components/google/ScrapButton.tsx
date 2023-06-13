// @ts-nocheck
import { useEffect } from "react";

function ScrapButton() {
  useEffect(() => {
    const hyperlinks = document.querySelectorAll(".jGGQ5e");

    hyperlinks.forEach((el) => {
      const button = document.createElement("button");
      button.textContent = "스크랩";
      button.style.marginLeft = "15px";
      button.style.height = "25px";
      button.style.top = "40px";
      button.style.position = "relative";

      el.style.display = "flex";
      el.appendChild(button);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
      });
    });
  }, []);
  return null;
}

export default ScrapButton;
