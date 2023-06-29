import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const firstDate = selectedDates[0];
      const btnStartTimerEl = document.querySelector("button[data-start]");
       if (firstDate > new Date()) {
      btnStartTimerEl.disabled = false;
    } else {
         btnStartTimerEl.disabled = true;
         window.alert("Please choose a date in the future");
    }
  },
};

const btnStartTimerEl = document.querySelector("button[data-start]");
const fieldSelectDateEl = document.querySelector('input[type="text"]');
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let countdownInterval;
let targetDate;

fieldSelectDateEl.addEventListener("input", flatpickr(fieldSelectDateEl, options));
btnStartTimerEl.addEventListener("click", onBtnStartTimer);
btnStartTimerEl.disabled = true;

function onBtnStartTimer() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  targetDate = new Date(fieldSelectDateEl.value);

  countdownInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay(0, 0, 0, 0);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  updateTimerDisplay(days, hours, minutes, seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatNumber(num) {
  return num.toString().padStart(2, "0");
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = formatNumber(days);
  hoursEl.textContent = formatNumber(hours);
  minutesEl.textContent = formatNumber(minutes);
  secondsEl.textContent = formatNumber(seconds);
}

