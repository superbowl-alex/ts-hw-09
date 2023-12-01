// import required packages
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

type Refs = {
  inputDate: HTMLInputElement | null;
  btnStart: HTMLButtonElement | null;
  indicateDays: HTMLSpanElement | null;
  indicateHours: HTMLSpanElement | null;
  indicateMinutes: HTMLSpanElement | null;
  indicateSeconds: HTMLSpanElement | null;
};

type Options = {
  enableTime: boolean;
  time_24hr: boolean;
  defaultDate: Date;
  minuteIncrement: number;
  onClose(selectedDates: Date[]): void; 
};

type ConvertData = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// create references to DOM elements
const refs: Refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  indicateDays: document.querySelector('.value[data-days]'),
  indicateHours: document.querySelector('.value[data-hours]'),
  indicateMinutes: document.querySelector('.value[data-minutes]'),
  indicateSeconds: document.querySelector('.value[data-seconds]'),
};

// variable declaration
let intervalId: number;
let selectedDate: number;
let currentDate: number;

// flatpickr function parameter object
const options: Options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = new Date(selectedDates[0]).getTime();
    currentDate = Date.now();
    validateDate(selectedDate, currentDate);
  },
};

// add an eventListener to the start button
if(refs.btnStart) {
  refs.btnStart.addEventListener('click', onClickStart);
  refs.btnStart.disabled = true;
}

// create flatpickr object
if(refs.inputDate) flatpickr(refs.inputDate, options);

// selected date validation function
function validateDate(date1: number, date2: number): void {
  if (date1 > date2) {
    Notiflix.Notify.success('Date is valid', {
      position: 'center-top',
    });
    if(refs.btnStart) refs.btnStart.disabled = false;
  } else {
    Notiflix.Notify.failure('Please choose a date in the future', {
      position: 'center-top',
    });
  }
}

// function that is triggered when the start button is clicked
function onClickStart(): void {
  if(refs.btnStart && refs.inputDate) {
    refs.btnStart.disabled = true;
    intervalId = setInterval(calcOfRemainingTime, 1000);
    refs.inputDate.disabled = true;
  }
}

// remaining time counting function
function calcOfRemainingTime(): void {
  currentDate = Date.now();
  const differenceDate: number = selectedDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(differenceDate);
  showCountdown(days, hours, minutes, seconds);
  if (differenceDate < 1000) {
    clearInterval(intervalId);
  }
}

// date difference conversion function
function convertMs(ms: number): ConvertData {
  // Number of milliseconds per unit of time
  const second: number = 1000;
  const minute: number = second * 60;
  const hour: number = minute * 60;
  const day: number = hour * 24;

  // Remaining days
  const days: number = Math.floor(ms / day);
  // Remaining hours
  const hours: number = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes: number = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds: number = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// remaining time display function
function showCountdown(day: number, hour: number, min: number, sec: number): void {
  if(refs.indicateDays && refs.indicateHours && refs.indicateMinutes && refs.indicateSeconds) {
    refs.indicateDays.textContent = pad(day);
    refs.indicateHours.textContent = pad(hour);
    refs.indicateMinutes.textContent = pad(min);
    refs.indicateSeconds.textContent = pad(sec);
  }
}

// function to represent a number with at least two digits
function pad(value: number): string {
  return String(value).padStart(2, '0');
}
