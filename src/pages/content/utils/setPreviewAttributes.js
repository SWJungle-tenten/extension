const setPreviewAttributes = (event, time, trigger) => {
  const avoidClassName = ["k8XOCe R0xfCb VCOFK s8bAkb", "fl", "zItAnd", "zItAnd FOU1zf", "gb_d gb_Fa gb_x", "zItAnd"];
  const avoidId = ["logo", "pnnext", "pnprev"];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let eventTarget;
      if (trigger === "mouse") {
        eventTarget = event.target.parentElement;
      } else {
        eventTarget = event.target;
      }
      if (
        eventTarget?.tagName === "A" &&
        !avoidClassName.includes(eventTarget.className) &&
        !avoidId.includes(eventTarget.id)
      ) {
        if (eventTarget === document.querySelector('a[jsname="gXWYVe"]')) return;

        resolve([eventTarget.href, eventTarget.querySelector("h3")?.innerText]);
      }
    }, time);
  });
};

export default setPreviewAttributes;
