import { SERVER_ADDR } from "/utils/env";

const setPreviewAttributes = (event, time, trigger) => {
  const avoidClassName = [
    "k8XOCe R0xfCb VCOFK s8bAkb",
    "fl",
    "zItAnd",
    "zItAnd FOU1zf",
    "gb_d gb_Fa gb_x",
    "gb_d",
    "zItAnd",
    "CHn7Qb pYouzb",
    "Fx4vi wHYlTd ZYHQ7e",
    "hisnlb M6Nvye",
    "jRKCUd",
  ];
  const avoidId = ["logo", "pnnext", "pnprev"];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let eventTarget;
      if ((eventTarget = event.target.closest("a"))) {
        if (
          eventTarget === document.querySelector('a[jsname="gXWYVe"]') ||
          avoidClassName.includes(eventTarget.className) ||
          avoidId.includes(eventTarget.id)
        )
          return;
        if (eventTarget.href.split("://")[0] === "http") {
          resolve([`${SERVER_ADDR}/http-request`], "wrong request");
        }

        resolve([eventTarget.href, eventTarget.querySelector("h3")?.innerText]);
      }
    }, time);
  });
};

export default setPreviewAttributes;
