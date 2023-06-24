import { useEffect } from "react";
import handlePreviewEvent from "../utils/handlePreviewEvent";

function Shortcuts({
  setPreviewUrl,
  handleCaptureClick,
  setScrapButtonClicked,
}) {
  const focusable = document.querySelectorAll(".LC20lb");

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (document.activeElement?.tagName === "TEXTAREA") return;

      const focusableElements = document.querySelectorAll('div.yuRUbf > a > h3');
      const focusable = Array.from(focusableElements);

      if (e.code === "KeyS" || e.code === "KeyW") {
        e.preventDefault();

        const currentElement = document.activeElement;
        let curFocus = focusable.indexOf(currentElement);
        let nextFocus;
        do {
          if (e.code === "KeyS") {
            nextFocus = curFocus < focusable.length - 1 ? curFocus + 1 : 0;
          } else {
            nextFocus = curFocus > 0 ? curFocus - 1 : focusable.length - 1;
          }
          curFocus = nextFocus;
        } while (focusable[nextFocus].closest('.Wt5Tfe'));
        
        if (curFocus !== -1) {
          const curFocusElement =
            focusable[curFocus].parentElement.parentElement.parentElement
              .parentElement.parentElement;
          curFocusElement.style.removeProperty("border");
          curFocusElement.style.removeProperty("top");
        }

        focusable[nextFocus].setAttribute("tabindex", "0");
        focusable[nextFocus].focus();
        focusable[nextFocus].scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nextFocusElement =
          focusable[nextFocus].parentElement.parentElement.parentElement
            .parentElement.parentElement;
        nextFocusElement.style.border = "solid 1px";
        nextFocusElement.style.top = "-4px";

      }

      if (e.code === "KeyT") {
        e.preventDefault();
        handleCaptureClick();
      }
      if (e.code === "Space") {
        e.preventDefault();
        setScrapButtonClicked(true);
      }
    };
    document.addEventListener("keypress", handleKeyPress);

    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [handleCaptureClick, setScrapButtonClicked]);

  document.addEventListener(
    "focus",
    async (e) => {
      const [url, title] = await handlePreviewEvent(e);
      setPreviewUrl(url);
    },
    { capture: true }
  );
}

export default Shortcuts;
