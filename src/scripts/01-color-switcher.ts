// create references to DOM elements
type Refs = {
  body: HTMLElement | null;
  btnStart: HTMLButtonElement | null;
  btnStop: HTMLButtonElement | null;
};

const refs: Refs = {
  body: document.body,
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

// variable declaration
let timerId: number;

// add an eventListener to the start and stop buttons
refs.btnStart?.addEventListener('click', onClickStart);
refs.btnStop?.addEventListener('click', onClickStop);

if(refs.btnStop) refs.btnStop.disabled = true;

// function that is triggered when the start button is clicked
function onClickStart(): void {
  if(refs.btnStart && refs.btnStop && refs.body) {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  timerId = setInterval(() => {
    if(refs.body) refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  }
}

// function that is triggered when the stop button is clicked
function onClickStop(): void {
  if(refs.btnStart && refs.btnStop) {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(timerId);
  }
}

// function to generate random color
function getRandomHexColor(): string {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);
  return `rgb(${red},${green},${blue})`;
}
