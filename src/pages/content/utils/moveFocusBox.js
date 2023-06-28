const moveFocusBox = (previousContainer, currentTarget, isKeyboard) => {
  let container;
  if (currentTarget.closest(".BToiNc")) {
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
  }

  console.log("target:", currentTarget);
  console.log("현재 하이라이팅되는 박스:", container);
  if (!container) return;

  container.classList.add("focusBox");
  if (isKeyboard) {
    container.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  if (previousContainer.current && previousContainer.current !== container) {
    console.log("하이라이팅 지우는 박스:", previousContainer.current);
    previousContainer.current.classList.remove("focusBox");
  }

  if (document.querySelector("#TWfxFb")) document.querySelector("#TWfxFb").style.height = "0px";
  previousContainer.current = container;
};

export default moveFocusBox;