// @ts-nocheck
import { useState } from "react";

function Google() {
  const [previewUrl, setPreviewUrl] = useState(null);

  document.addEventListener(
    "mouseover",
    (e) => {
      const eventTarget = e.target;
      setTimeout(() => {
        switch (eventTarget?.className) {
          case "LC20lb MBeuO DKV0Md":
            setPreviewUrl(eventTarget.parentElement.href);
            break;
          case "HiHjCd":
            setPreviewUrl(eventTarget.href);
            break;
        }
      }, 600);
    },
    { capture: true }
  );

  return (
    <div style={{ width: "800px", marginLeft: "160px", height: "700px", top: "0", position: "sticky" }}>
      <iframe id="previewer" title="previewer" src={previewUrl} style={{ width: "100%", height: "100%" }}></iframe>
    </div>
  );
}

export default Google;
