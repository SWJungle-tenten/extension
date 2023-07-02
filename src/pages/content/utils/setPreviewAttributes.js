import { SERVER_ADDR } from "/utils/env";

const setPreviewAttributes = (event, time, trigger) => {
  const avoidClassName = [
    "CHn7Qb pYouzb",
    "hisnlb M6Nvye",
    "jRKCUd", // 뉴스 더보기
    "ekf0x hSQtef",
    "ZkkK1e yUTMj k1U36b", // 관련 이미지
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
      let targetContent;
      if ((targetContent = event.target.closest("a"))) {
        if (
          targetContent === document.querySelector('a[jsname="gXWYVe"]') ||
          avoidClassName.includes(targetContent.className)
        )
          return;
        if (targetContent.href.split("://")[0] === "http") {
          resolve({ url: `${SERVER_ADDR}/http-request`, title: "wrong request", originalUrl: targetContent.href });
        }
        console.log(targetContent.querySelector(".cHaqb"), targetContent.querySelector(".cHaqb").innerText);
        const title = targetContent.querySelector("h3")
          ? targetContent.querySelector("h3").innerText // 일반적 제목
          : targetContent.querySelector(".cHaqb")
          ? targetContent.querySelector(".cHaqb").innerText // 동영상
          : targetContent.querySelector("div[role='heading']"); // 뉴스
        resolve({ url: targetContent.href, title: title });
      }
    }, time);
  });
};

export default setPreviewAttributes;
