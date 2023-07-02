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
          } else {
            let curFocus = document.querySelector(`a[href="${curPreview}"]`);
            if (!curFocus)
              curFocus = document.querySelector(
                `a[href="${document.querySelector("#previewer").dataset.originalUrl}"]`
              );

            const getNextFocus = (next) => {
              if (next.classList.contains("hlcw0c")) {
                console.log("next:", next);
                return getNextFocus(next.querySelector(".MjjYud"));
              } else if (next.classList.contains("ULSxyf")) {
                if (next.querySelector(".IJl0Z")) {
                  return next.querySelector("IJl0Z");
                } else {
                  return getNextFocus(getNextContainer(next));
                }
              } else {
                if (
                  next.querySelector(".T6zPgb")?.querySelector("span").innerText === "관련 질문" ||
                  next.querySelector(".T6zPgb")?.querySelector("span").innerText === "관련 검색어"
                ) {
                  return getNextFocus(getNextContainer(next));
                } else if (next.querySelector(".DhN8Cf")) {
                  return next.querySelector(".DhN8Cf"); // 일단은 첫번째 영상만
                } else if (next.querySelector(".yuRUbf")) {
                  return next.querySelector(".yuRUbf"); // 일단은 미니사이트 빼고 첫번째만
                }
              }
            };

            // 일단은 대분류 내에서만 다음거 찾기, 뉴스나 동영상 내에서 next 찾는건 나중에
            const getNextContainer = (cur) => {
              let topLevelContainer;
              if ((topLevelContainer = cur.closest(".hlcw0c"))) {
              } else if ((topLevelContainer = cur.closest(".ULSxyf"))) {
              } else {
                topLevelContainer = cur.closest(".MjjYud");
              }
              return e.code === "KeyS"
                ? topLevelContainer.nextElementSibling
                : topLevelContainer.previousElementSibling;
            };
            const nextContainer = getNextContainer(curFocus);
            console.log("nextContainer", nextContainer);
            nextFocus = getNextFocus(nextContainer);
            console.log("nextFocus", nextFocus);
          }
          nextFocus.querySelector("a").focus(); // 마우스랑 setAttribute를 따로 쓰면 작은 a태그도 처리 가능할 듯?
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    const handleFocus = async (e) => {
      const { url, title, originalUrl } = await setPreviewAttributes(e, 500, "keyboard");
      console.log("gotton url after setPreviewAttributes", url, title);
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
