const moveFocusBox = (previousContainer, currentTarget, isKeyboard) => {
  let container;

  if (currentTarget.closest(".IJl0Z")) {
    // 주요 뉴스, "윤석열"
    container = currentTarget.closest(".IJl0Z");
  } else if (currentTarget.closest(".BToiNc")) {
    container = currentTarget.closest(".BToiNc");
  } else if (currentTarget.closest(".tF2Cxc")) {
    container = currentTarget.closest(".tF2Cxc");
  } else if (currentTarget.closest(".RzdJxc")) {
    container = currentTarget.closest(".RzdJxc");
  } else if (currentTarget.closest(".K7khPe")) {
    container = currentTarget.closest(".K7khPe");
  } else if (currentTarget.closest(".clickable-card")) {
    container = currentTarget.closest(".clickable-card");
  } else if (currentTarget.closest(".WlydOe")) {
    container = currentTarget.closest(".WlydOe");
  } else if (currentTarget.closest(".v1uiFd")) {
    container = currentTarget.closest(".v1uiFd");
  } else if (currentTarget.closest(".g")) {
    //g dFd2Tb PhX2wd
    container = currentTarget.closest(".g");
  }

  if (!container) return;

  container.classList.add("focusBox");
  if (isKeyboard) {
    container.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  if (previousContainer.current && previousContainer.current !== container) {
    previousContainer.current.classList.remove("focusBox");
  }

  if (document.querySelector("#TWfxFb")) document.querySelector("#TWfxFb").style.height = "0px";
  previousContainer.current = container;
};

export default moveFocusBox;
