// @ts-nocheck
const handlePreviewEvent = (e) => {
  const eventTarget = e.target;

  setTimeout(() => {
    if (eventTarget?.className === "LC20lb MBeuO DKV0Md") {
      return eventTarget.parentElement.href;
    } else if (
      (eventTarget.tagName === "A") &
      (((eventTarget.className === "") & (eventTarget.id === "")) | (eventTarget.className === "l"))
    ) {
      return eventTarget.href;
    }
  }, 700);
};

export default handlePreviewEvent;
