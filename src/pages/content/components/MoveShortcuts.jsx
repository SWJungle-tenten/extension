import { useEffect } from "react";
import setPreviewAttributes from "../utils/setPreviewAttributes";
import moveFocusBox from "../utils/moveFocusBox";

function MoveShortcuts({ setPreviewUrl, setPreviewTitle, previousContainer }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (document.activeElement?.tagName === "TEXTAREA") return;

      if (e.code === "KeyS" || e.code === "KeyW") {
        e.preventDefault();
        const curPreview = document.querySelector("#previewer").src;
        const searchContainer = document.querySelector("#rso");

        // 인물 검색
        if (searchContainer.querySelector("#kp-wp-tab-overview")) {
          if (!curPreview) {
            if (e.code === "KeyS") {
              searchContainer.querySelector("#kp-wp-tab-overview > .cLjAic:first-child").querySelector("a").focus();
            } else {
              // searchContainer.querySelector("#kp-wp-tab-overview > .cLjAic:last-child").querySelector("a").focus();
            }
          } else {
            // previewer에 있을 때
          }
        } else {
          // 인물검색 외
          if (!curPreview) {
            let nextFocus;
            if (e.code === "KeyS") {
              nextFocus = searchContainer.querySelector(".v7W49e > div:first-child");
              while (nextFocus.className === "ULSxyf") {
                nextFocus = nextFocus.nextElementSibling;
              }
            } else {
              nextFocus = searchContainer.querySelector(".v7W49e > div:last-child");
              while (nextFocus.className === "ULSxyf") {
                nextFocus = nextFocus.previousElementSibling;
              }
            }
            nextFocus.querySelector("a").focus(); // 마우스랑 setAttribute를 따로 쓰면 작은 a태그도 처리 가능할 듯?
          } else {
            let curFocus = document.querySelector(`a[href="${curPreview}"]`);
            if (!curFocus)
              curFocus = document.querySelector(
                `a[href="${document.querySelector("#previewer").dataset.originalUrl}"]`
              );
            const topLevelContainer = curFocus.closest(".hlcw0c")
              ? curFocus.closest(".hlcw0c")
              : curFocus.closest(".ULSxyf")
              ? curFocus.closest(".ULSxyf")
              : curFocus.closest(".MjjYud");

            if (e.code === "KeyS") {
              topLevelContainer.nextElementSibling?.querySelector("a").focus();
            } else {
              topLevelContainer.previousElementSibling?.querySelector("a").focus();
            }
          }
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    const handleFocus = async (e) => {
      const { url, title, originalUrl } = await setPreviewAttributes(e, 500, "keyboard");
      if (url && title) {
        moveFocusBox(previousContainer, e.target.parentElement, true);
        setPreviewUrl(url);
        setPreviewTitle(title);
        document.querySelector("#previewer").dataset.originalUrl = originalUrl;
      }
    };
    document.addEventListener("focus", handleFocus, { capture: true });

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("focus", handleFocus, { capture: true });
    };
  }, []);
}

export default MoveShortcuts;
