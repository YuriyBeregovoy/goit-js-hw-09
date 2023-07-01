import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

const amount = Number.parseInt(document.querySelector('input[name="amount"]').value);
  const delay = Number.parseInt(document.querySelector('input[name="delay"]').value);
  const step = Number.parseInt(document.querySelector('input[name="step"]').value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promiseDelay = delay + step * i;

    
    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});