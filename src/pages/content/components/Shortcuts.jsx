import { useEffect } from "react";
import setPreviewAttributes from "../utils/setPreviewAttributes";
import moveFocusBox from "../utils/moveFocusBox";

function Shortcuts({ setPreviewUrl, handleCapture, setScrapButtonClicked, setPreviewTitle, previousContainer }) {
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
          const topLevelContainer = curFocus.closest(".hlcw0c")
            ? curFocus.closest(".hlcw0c")
            : curFocus.closest(".MjjYud");

          let nextFocus = topLevelContainer;
          if (e.code === "KeyS") {
            while (nextFocus.nextElementSibling) {
              nextFocus = nextFocus.nextElementSibling;
              if (nextFocus.querySelector("a")) break;
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
        moveFocusBox(previousContainer, e.target, true);
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
