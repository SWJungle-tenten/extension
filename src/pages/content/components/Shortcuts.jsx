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

      if (e.code === "KeyS" || e.code === "KeyW") {
        e.preventDefault();

        const currentElement = document.activeElement;
        const curFocus = Array.from(focusable).indexOf(currentElement);
        let nextFocus;
        if (e.code === "KeyS") {
          nextFocus = curFocus < focusable.length - 1 ? curFocus + 1 : 0;
        } else {
          nextFocus = curFocus > 0 ? curFocus - 1 : focusable.length - 1;
        }
        focusable[nextFocus].setAttribute("tabindex", "0");
        focusable[nextFocus].focus();
        focusable[
          curFocus
        ].parentElement.parentElement.parentElement.parentElement.parentElement.style.removeProperty(
          "border"
        );
        focusable[
          curFocus
        ].parentElement.parentElement.parentElement.parentElement.parentElement.style.removeProperty(
          "top"
        );
        focusable[
          nextFocus
        ].parentElement.parentElement.parentElement.parentElement.parentElement.style.border =
          "solid 1px";
        focusable[
          curFocus
        ].parentElement.parentElement.parentElement.parentElement.parentElement.style.top =
          "-2px";
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
  }, [focusable, handleCaptureClick, setScrapButtonClicked]);

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
