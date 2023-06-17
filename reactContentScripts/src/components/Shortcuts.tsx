// @ts-nocheck
import { useEffect, useState } from "react";

function Shortcuts({ setPreviewUrl }) {
  const focusable = document.querySelectorAll(".LC20lb");
  const [curFocus, setCurFocus] = useState(-1);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "s") {
        e.preventDefault();

        const nextFocus = curFocus < focusable.length - 1 ? curFocus + 1 : 0;
        focusable[nextFocus].setAttribute("tabindex", "0");
        focusable[nextFocus].focus();
        setCurFocus(nextFocus);
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [curFocus, focusable]);
}

export default Shortcuts;
