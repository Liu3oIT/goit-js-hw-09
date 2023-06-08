import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

// const input = document.querySelector('#datetime-picker');
// const startTimeBtn = document.querySelector('button[data-start]');
// const timerRef = document.querySelector('.timer');

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };
// let ontime = flatpickr(input, options);
// const timer = {
//   start() {
//     const starTime = Date.now();
//     setInterval(() => {
//       const currentTime = ontime.toString;
//       const deltaTime = currentTime - starTime;
//       const time = convertMs(deltaTime);
//       console.log(`${days}: ${hours}:${minutes}:${seconds}`);
//       updateClockface(time);
//     }, 1000);
//   },
// };

// const pad = value => {
//   return String(value).padStart(2, '0');
// };
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = pad(Math.floor(ms / day));
//   // Remaining hours
//   const hours = pad(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = pad(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

// const updateClockface = ({ days, hours, minutes, seconds }, event) => {
//   const { target } = event;
//   const daysValue = target.querySelector('[data-days]').dataset.days;
//   const hoursValue = target.querySelector('[data-hours]').dataset.hours;
//   const minutesValue = target.querySelector('[data-minutes]').dataset.minutes;
//   const secondsValue = target.querySelector('[data-seconds]').dataset.seconds;
//   daysValue.textContent = `${days}`;
//   hoursValue.textContent = `${hours}`;
//   minutesValue.textContent = `${minutes}`;
//   secondsValue.textContent = `${seconds}`;
// };
// startTimeBtn.addEventListener('click', () => {
//   timer.start();
// });
const input = document.querySelector('#datetime-picker');
const startTimeBtn = document.querySelector('button[data-start]');
const timerRef = document.querySelector('.timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
  },
};
let ontime = flatpickr(input, options);

const timer = {
  start() {
    startTimeBtn.disabled = true;
    const selectedDate = ontime.selectedDates[0].getTime();

    const updateTimer = () => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;

      if (deltaTime <= 0) {
        clearInterval(timerInterval);
        startTimeBtn.disabled = false;
        Notiflix.Notify.success('Countdown finished!');
        return;
      }

      const time = convertMs(deltaTime);
      updateClockface(time);
    };

    updateTimer();

    const timerInterval = setInterval(updateTimer, 1000);
  },
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateClockface = ({ days, hours, minutes, seconds }) => {
  const daysValue = timerRef.querySelector('[data-days]');
  const hoursValue = timerRef.querySelector('[data-hours]');
  const minutesValue = timerRef.querySelector('[data-minutes]');
  const secondsValue = timerRef.querySelector('[data-seconds]');

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
};

startTimeBtn.addEventListener('click', () => {
  const selectedDate = ontime.selectedDates[0];
  const currentTime = new Date();

  if (selectedDate.getTime() <= currentTime.getTime()) {
    Notiflix.Notify.failure('Please choose a future date.');
    return;
  }

  timer.start();
});
