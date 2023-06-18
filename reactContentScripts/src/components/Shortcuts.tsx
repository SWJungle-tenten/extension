// @ts-nocheck
import { useEffect, useState } from "react";
import handlePreviewEvent from "../util/handlePreviewEvent";

function Shortcuts({ setPreviewUrl }) {
  const focusable = document.querySelectorAll(".LC20lb");
  const [curFocus, setCurFocus] = useState(-1);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (document.activeElement?.tagName === "TEXTAREA") return;

      if (e.key === "s" || e.key === "w") {
        e.preventDefault();
        if (e.key === "s") {
          const nextFocus = curFocus < focusable.length - 1 ? curFocus + 1 : 0;
        } else {
          const nextFocus = curFocus > 0 ? curFocus - 1 : focusable.length - 1;
        }

        focusable[nextFocus].setAttribute("tabindex", "0");
        focusable[nextFocus].focus();
        focusable[curFocus]?.parentElement.parentElement.parentElement?.parentElement?.parentElement.style.border = "";
        focusable[curFocus]?.parentElement.parentElement.parentElement?.parentElement?.parentElement.style.top = "2px";
        focusable[nextFocus].parentElement.parentElement.parentElement?.parentElement?.parentElement.style.border =
          "solid 1px";
        focusable[curFocus]?.parentElement.parentElement.parentElement?.parentElement?.parentElement.style.top = "-2px";
        setCurFocus(nextFocus);
      }
    };
    document.addEventListener("keypress", handleKeyPress);

    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [curFocus, focusable]);

  document.addEventListener(
    "focus",
    async (e) => {
      setPreviewUrl(await handlePreviewEvent(e, 300));
    },
    { capture: true }
  );
}

export default Shortcuts;
