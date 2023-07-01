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
        let nextFocus;
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
            if (e.code === "KeyS") {
              searchContainer.querySelector(".v7W49e > div:first-child").querySelector("a").focus(); // 마우스랑 setAttribute를 따로 쓰면 작은 a태그도 처리 가능할 듯?
            } else {
              searchContainer.querySelector(".v7W49e > div:last-child").querySelector("a").focus();
            }
          } else {
            const curFocus = document.querySelector(`a[href="${curPreview}"]`);

            const topLevelContainer = curFocus.closest(".hlcw0c")
              ? curFocus.closest(".hlcw0c")
                ? curFocus.closest(".ULSxyf")
                : curFocus.closest(".ULSxyf")
              : curFocus.closest(".MjjYud");

            console.log(topLevelContainer);

              // let nextFocus = topLevelContainer;
              if (e.code === "KeyS") {
                topLevelContainer.nextElementSibling.querySelector("a").focus();
                // while (nextFocus.nextElementSibling) {
                //   nextFocus = nextFocus.nextElementSibling;
                //   if (nextFocus.querySelector("a")) {
                //     break;
                //   }
                // }
              } else {
                topLevelContainer.previousElementSibling.querySelector("a").focus();
                // while (nextFocus.previousElementSibling) {
                //   nextFocus = nextFocus.previousElementSibling;
                //   if (nextFocus.querySelector("a")) break;
                // }
              }
            // nextFocus.querySelector("a")?.focus();
          }
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    const handleFocus = async (e) => {
      moveFocusBox(previousContainer, e.target.parentElement, true);
      const [url, title] = await setPreviewAttributes(e, 500, "keyboard");
      if (url && title) {
        setPreviewUrl(url);
        setPreviewTitle(title);
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
