
const bodyBckgColorEl = document.querySelector("body");
const startBtnChangeColorEl = document.querySelector("button[data-start]");
const buttonStopColorEl = document.querySelector("button[data-stop]");
let timerId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtnChangeColorEl.addEventListener('click', () => {
   timerId = setInterval(function () {
     bodyBckgColorEl.style.backgroundColor = getRandomHexColor(); 
   }, 1000)

  startBtnChangeColorEl.disabled = true;
  buttonStopColorEl.disabled = false;
});

buttonStopColorEl.addEventListener("click", () => {
  clearInterval(timerId);
  startBtnChangeColorEl.disabled = false;
  buttonStopColorEl.disabled = true;
});


