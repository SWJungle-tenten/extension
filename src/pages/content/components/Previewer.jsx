import setPreviewAttributes from "../utils/setPreviewAttributes";
import moveFocusBox from "../utils/moveFocusBox";

function Previewer({ accessToken, previewUrl, setPreviewUrl, previewTitle, setPreviewTitle, previousContainer }) {
  document.querySelector("#search").addEventListener(
    "mouseover",
    async (e) => {
      const { url, title, originalUrl } = await setPreviewAttributes(e, 700, "mouse");
      if (url && url !== document.querySelector("#previewer").src) {
        moveFocusBox(previousContainer, e.target, false);
        setPreviewUrl(url);
        setPreviewTitle(title);
        document.querySelector("#previewer").dataset.originalUrl = originalUrl;
      }
    },
    { capture: true }
  );

  return (
    <iframe
      id="previewer"
      title={previewTitle}
      src={previewUrl}
      onLoad={() => {
        // console.log("loaded", document.querySelector("#search"));
        // document.querySelector("#search").focus();
      }}
    ></iframe>
  );
}
export default Previewer;
