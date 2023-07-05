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
          if (!curPreview) {
            if (e.code === "KeyS") {
              nextFocus = searchContainer.querySelector(".v7W49e > div:first-of-type");
              console.log("nextFocus:", nextFocus);

              while (
                nextFocus.classList.contains("ULSxyf") &&
                !nextFocus.querySelector("h2")?.innerText.includes("추천 스니펫") &&
                !nextFocus.querySelector("[jsname='wRSfy']")
              ) {
                nextFocus = nextFocus.nextElementSibling;
              }
              if (nextFocus.querySelector("[jsname='wRSfy']")) {
                nextFocus = nextFocus.querySelector(".RzdJxc");
              }
            } else {
              nextFocus = searchContainer.querySelector(".v7W49e > div:last-child");
              while (nextFocus.classList.contains("ULSxyf")) {
                nextFocus = nextFocus.previousElementSibling;
              }
            }
          } else {
            let curFocus = searchContainer.querySelector(`a[href="${curPreview}"]`);
            if (!curFocus) {
              // http 사이트일 때
              curFocus = document.querySelector(
                `a[href="${document.querySelector("#previewer").dataset.originalUrl}"]`
              );
            }
            if (!curFocus) {
              curFocus = document.querySelector(`a[href="#${curPreview.split("#")[1]}"]`);
            }
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

            const getNextFocus = (next) => {
              if (next.classList.contains("hlcw0c")) {
                return getNextFocus(next.querySelector(".MjjYud"));
              } else if (next.classList.contains("ULSxyf")) {
                if (next.querySelector(".IJl0Z")) {
                  return next.querySelector("IJl0Z");
                } else if (next.querySelector("h2")?.innerText.includes("추천 스니펫")) {
                  return next.querySelector(".yuRUbf");
                } else if (next.querySelector("[jsname='wRSfy']")) {
                  return next.querySelector(".RzdJxc");
                } else {
                  return getNextFocus(getNextContainer(next));
                }
              } else {
                const innerTitle = next.querySelector(".T6zPgb")?.querySelector("span").innerText;
                if (innerTitle === "관련 질문" || innerTitle === "관련 검색어") {
                  return getNextFocus(getNextContainer(next));
                } else if (next.querySelector(".DhN8Cf")) {
                  return next.querySelector(".DhN8Cf"); // 일단은 첫번째 영상만
                } else if (next.querySelector(".yuRUbf")) {
                  return next.querySelector(".yuRUbf"); // 일단은 미니사이트 빼고 첫번째만
                }
              }
            };

            console.log("curFocus:", curFocus);
            const nextContainer = getNextContainer(curFocus);
            console.log("nextContainer:", nextContainer);
            nextFocus = getNextFocus(nextContainer);
            console.log("nextFocus:", nextFocus);
          }
          console.log("final nextFocus:", nextFocus);
          nextFocus.querySelector("a").focus(); // 마우스랑 setAttribute를 따로 쓰면 작은 a태그도 처리 가능할 듯?
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    const handleFocus = async (e) => {
      const { url, title, originalUrl } = await setPreviewAttributes(e, 300, "keyboard");

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
