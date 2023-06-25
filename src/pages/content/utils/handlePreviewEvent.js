const handlePreviewEvent = (event, time) => {
  const eventTarget = event.target;
  const avoidClassName = ["k8XOCe R0xfCb VCOFK s8bAkb", "fl", "zItAnd", "gb_d gb_Fa gb_x", "zItAnd"];
  const avoidId = ["logo", "pnnext", "pnprev"];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        eventTarget.parentElement?.tagName === "A" &&
        !avoidClassName.includes(eventTarget.parentElement.className) &&
        !avoidId.includes(eventTarget.parentElement.id)
      ) {
        if (eventTarget.parentElement.jaName === "gXWYVe") return;
        resolve([eventTarget.parentElement.href, eventTarget.innerText]);
      }

      // if (eventTarget?.className === "LC20lb MBeuO DKV0Md") {
      //   resolve(eventTarget.parentElement.href);
      // } else if (
      //   (eventTarget.tagName === "A") &
      //   (((eventTarget.className === "") & (eventTarget.id === "")) | (eventTarget.className === "l"))
      // ) {
      //   resolve([eventTarget.href, eventTarget.querySelector("h3").innerText]);
      // }
    }, time);
  });
};

export default handlePreviewEvent;
