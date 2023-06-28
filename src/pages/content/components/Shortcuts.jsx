import { useEffect } from "react";
import setPreviewAttributes from "../utils/setPreviewAttributes";
import moveFocusBox from "../utils/moveFocusBox";

function Shortcuts({
  setPreviewUrl,
  handleCapture,
  setScrapButtonClicked,
  setPreviewTitle,
  previousContainer,
}) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (document.activeElement?.tagName === "TEXTAREA") return;

      if (e.code === "KeyS" || e.code === "KeyW") {
        e.preventDefault();

        const curPreview = document.querySelector("#previewer").src;
        if (!curPreview) {
          if (e.code === "KeyS") {
            document.querySelector(".MjjYud:first-child").querySelector("a").focus();
          } else {
            document.querySelector(".MjjYud:last-child").querySelector("a").focus();
          }
        } else {
          const curFocus = document.querySelector(`a[href="${curPreview}"]`);
          console.log("이전 포커스:", curFocus);
          const topLevelContainer = curFocus.closest(".hlcw0c")
            ? curFocus.closest(".hlcw0c")
            : curFocus.closest(".MjjYud");
          console.log("이전 포커스의 최상위:", topLevelContainer);

          let nextFocus = topLevelContainer;
          if (e.code === "KeyS") {
            while (nextFocus.nextElementSibling) {
              nextFocus = nextFocus.nextElementSibling;
              console.log("다음 포커스:", nextFocus);
              if (nextFocus.querySelector("a")) {
                console.log("여기 a태그가 있음, 이거 포커스하자");
                break;
              }
              console.log("여긴 a태그가 없음, 다음 박스 찾기");
            }
          } else {
            while (nextFocus.previousElementSibling) {
              nextFocus = nextFocus.previousElementSibling;
              if (nextFocus.querySelector("a")) break;
            }
          }
          nextFocus.querySelector("a")?.focus();
        }
      }

      if (e.code === "KeyT" || e.code === "KeyC" || e.code === "Space") {
        e.preventDefault();
        e.code === "KeyT"
          ? handleCapture("text")
          : e.code === "KeyC"
          ? handleCapture("image")
          : setScrapButtonClicked(true);
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    const handleFocus = async (e) => {
      const [url, title] = await setPreviewAttributes(e, 500, "keyboard");
      if (url && title) {
        moveFocusBox(previousContainer, e.target.parentElement, true);
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

export default Shortcuts;
