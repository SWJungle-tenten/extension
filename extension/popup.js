const activatebtn = document.querySelector("#activate");
let isActive = false;

activatebtn.addEventListener("click", () => {
  isActive = !isActive;
  activatebtn.innerText = `활성화: ${isActive ? "ON" : "OFF"}`;
});

activatebtn.innerText = `활성화: ${isActive ? "ON" : "OFF"}`;
