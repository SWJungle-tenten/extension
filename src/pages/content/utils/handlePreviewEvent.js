const handlePreviewEvent = (event, time) => {
  const eventTarget = event.target;
  const avoidClassName = ["k8XOCe R0xfCb VCOFK s8bAkb", "fl", "zItAnd", "zItAnd FOU1zf", "gb_d gb_Fa gb_x", "zItAnd"];
  const avoidId = ["logo", "pnnext", "pnprev"];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        eventTarget?.parentElement?.tagName === "A" &&
        !avoidClassName.includes(eventTarget.parentElement.className) &&
        !avoidId.includes(eventTarget.parentElement.id)
      ) {
        if (eventTarget?.parentElement === document.querySelector('a[jsname="gXWYVe"]')) return;
        resolve([eventTarget?.parentElement.href, eventTarget.parentElement.querySelector("h3")?.innerText]);
      }
    }, time);
  });
};

export default handlePreviewEvent;
