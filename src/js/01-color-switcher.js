function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

const changeColorBody = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
};

startBtn.addEventListener('click', changeColorBody);

const stopchangeColorBody = () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
};

stopBtn.addEventListener('click', stopchangeColorBody);
