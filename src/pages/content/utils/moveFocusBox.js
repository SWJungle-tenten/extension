const moveFocusBox = (previousContainer, currentTarget, isKeyboard) => {
  const container = currentTarget.closest(".BToiNc")
    ? currentTarget.closest(".BToiNc")
    : currentTarget.closest(".tF2Cxc");

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
  previousContainer.current = container;
};

export default moveFocusBox;
