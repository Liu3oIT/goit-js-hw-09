import Notiflix from 'notiflix';

const form = document.querySelector('form');
const delayPromise = form.elements.delay;
const stepRun = form.elements.step;
const amountPromise = form.elements.amount;
let position = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

const submitForm = event => {
  event.preventDefault();
  const amount = parseInt(amountPromise.value);
  const initialDelay = parseInt(delayPromise.value);
  const step = parseInt(stepRun.value);
  Array.from({ length: amount }).forEach((_, index) => {
    position = index + 1;
    let delayForEachPromise = initialDelay + index * step;
    createPromise(position, delayForEachPromise)
      .then(success => {
        Notiflix.Notify.success(`${success}`);
      })
      .catch(error => {
        Notiflix.Notify.failure(`${error}`);
      });
  });
};

form.addEventListener('submit', submitForm);
