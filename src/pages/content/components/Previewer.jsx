import setPreviewAttributes from "../utils/setPreviewAttributes";
import moveFocusBox from "../utils/moveFocusBox";

function Previewer({ accessToken, previewUrl, setPreviewUrl, previewTitle, setPreviewTitle, previousContainer }) {
  document.querySelector("#search").addEventListener(
    "mouseover",
    async (e) => {
      const [url, title] = await setPreviewAttributes(e, 700, "mouse");
      if (url && url !== document.querySelector("#previewer").src) {
        moveFocusBox(previousContainer, e.target, false);
        setPreviewUrl(url);
        setPreviewTitle(title);
      }
    },
    { capture: true }
  );

  return <iframe id="previewer" title={previewTitle} src={previewUrl}></iframe>;
}
export default Previewer;
