// @ts-nocheck
import { useState } from "react";

function Google() {
  const [previewUrl, setPreviewUrl] = useState(null);

  document.addEventListener(
    "mouseover",
    (e) => {
      const eventTarget = e.target;

      setTimeout(() => {
        if (eventTarget?.className === "LC20lb MBeuO DKV0Md") {
          setPreviewUrl(eventTarget.parentElement.href);
        } else if ((eventTarget.tagName === "A") & (eventTarget.className === "") & (eventTarget.id === "")) {
          setPreviewUrl(eventTarget.href);
        }
      }, 700);
    },
    { capture: true }
  );

  return (
    <div style={{ width: "40vw", marginLeft: "35px", height: "70vh", top: "0", position: "sticky" }}>
      <iframe id="previewer" title="previewer" src={previewUrl} style={{ width: "100%", height: "100%" }}></iframe>
    </div>
  );
}

export default Google;
