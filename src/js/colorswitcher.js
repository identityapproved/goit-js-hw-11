import '/css/common.css';

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let isActive = false;
let intervalId = null;

btnStart.addEventListener('click', () => {
   if (isActive) {
      return
   }
   intervalId = setInterval(changeColor, 1000);
   isActive = true;
   btnStart.setAttribute("disabled", true);
});

btnStop.addEventListener('click', () => {
   clearInterval(intervalId);
   isActive = false;
   btnStart.removeAttribute("disabled", true);
   // btnStart.setAttribute("disabled", false);
   // btnStart.setAttribute("disabled", true);
})

function changeColor() {
   document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}