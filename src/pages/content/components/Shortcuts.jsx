import { useEffect } from "react";
import handlePreviewEvent from "../utils/handlePreviewEvent";

function Shortcuts({
  setPreviewUrl,
  handleTextsCaptureClick,
  handleImageCaptureClick,
  setScrapButtonClicked,
  setPreviewTitle,
}) {
  useEffect(() => {
    let curFocusElement = null;

    const handleKeyPress = (e) => {
      if (document.activeElement?.tagName === "TEXTAREA") return;

      const focusableElements = document.querySelectorAll(
        "div.yuRUbf > a > h3"
      );
      const focusable = Array.from(focusableElements);

      if (e.code === "KeyS" || e.code === "KeyW") {
        e.preventDefault();

        const currentElement = document.activeElement;
        let curFocus = focusable.indexOf(currentElement);
        if (curFocus === -1) {
          curFocus = 0; // Set to the first element if the currentElement is not in the focusable array
        }
        let nextFocus;

        do {
          if (curFocusElement) {
            curFocusElement.style.removeProperty("border");
            curFocusElement.style.removeProperty("top");
          }
          if (e.code === "KeyS") {
            nextFocus = curFocus < focusable.length - 1 ? curFocus + 1 : 0;
          } else {
            nextFocus = curFocus > 0 ? curFocus - 1 : focusable.length - 1;
          }
          if (nextFocus < 0 || nextFocus >= focusable.length) {
            return;
          }
          curFocusElement =
            focusable[curFocus].parentElement.parentElement.parentElement
              .parentElement.parentElement;
          curFocus = nextFocus;
        } while (focusable[nextFocus].closest(".Wt5Tfe"));

        focusable[nextFocus].setAttribute("tabindex", "0");
        focusable[nextFocus].focus();
        focusable[nextFocus].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        const nextFocusElement =
          focusable[nextFocus].parentElement.parentElement.parentElement
            .parentElement.parentElement;
        nextFocusElement.style.border = "solid 1px";
        nextFocusElement.style.top = "-4px";
      }

      if (e.code === "KeyT") {
        e.preventDefault();
        handleTextsCaptureClick();
      }
      
      if (e.code === "KeyC") {
        e.preventDefault();
        handleImageCaptureClick();
      }

      if (e.code === "Space") {
        e.preventDefault();
        setScrapButtonClicked(true);
      }
    };
    document.addEventListener("keypress", handleKeyPress);

    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [handleImageCaptureClick, handleTextsCaptureClick, setScrapButtonClicked]);

  document.addEventListener(
    "focus",
    async (e) => {
      const [url, title] = await handlePreviewEvent(e);
      setPreviewUrl(url);
      setPreviewTitle(title);
    },
    { capture: true }
  );
}

export default Shortcuts;
