const handlePreviewEvent = (event, time) => {
  const eventTarget = event.target;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (eventTarget?.className === "LC20lb MBeuO DKV0Md") {
        resolve(eventTarget.parentElement.href);
      } else if (
        (eventTarget.tagName === "A") &
        (((eventTarget.className === "") & (eventTarget.id === "")) | (eventTarget.className === "l"))
      ) {
        resolve(eventTarget.href);
      }
    }, time);
  });
};

export default handlePreviewEvent;
