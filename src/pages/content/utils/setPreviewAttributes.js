import { SERVER_ADDR } from "/utils/env";

const setPreviewAttributes = (event, time, trigger) => {
  const avoidClassName = [
    "CHn7Qb pYouzb",
    "hisnlb M6Nvye",
    "jRKCUd", // 뉴스 더보기
    "ekf0x hSQtef",
  ];
  trigger === "keyboard" &&
    console.log(
      "event.target in setPreview: ",
      event.target,
      "event.target.closest('a') in setPreview:",
      event.target.closest("a")
    );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let eventTarget;
      if ((eventTarget = event.target.closest("a"))) {
        if (
          eventTarget === document.querySelector('a[jsname="gXWYVe"]') ||
          avoidClassName.includes(eventTarget.className)
        )
          return;
        if (eventTarget.href.split("://")[0] === "http") {
          resolve({ url: `${SERVER_ADDR}/http-request`, title: "wrong request", originalUrl: eventTarget.href });
        }

        const title = eventTarget.querySelector("h3")
          ? eventTarget.querySelector("h3").innerText // 일반적 제목
          : eventTarget.querySelector("div[role='heading']"); // 뉴스
        resolve({ url: eventTarget.href, title: title });
      }
    }, time);
  });
};

export default setPreviewAttributes;
