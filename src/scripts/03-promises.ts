// import required packages
import Notiflix from 'notiflix';

type Refs = {
  form: HTMLFormElement | null;
  delay: HTMLInputElement | null;
  step: HTMLInputElement | null;
  amount: HTMLInputElement | null;
};

// create references to DOM elements
const refs: Refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay]'),
  step: document.querySelector('input[name="step]'),
  amount: document.querySelector('input[name="amount]'),
};

// add an eventListener to the submit form
refs.form?.addEventListener('submit', onFormSubmit);

// function that works on form submit
function onFormSubmit(e: SubmitEvent): void {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  if(form) {
    const { elements } = form;
    const delayInput = elements.namedItem('delay') as HTMLInputElement | null;
    const stepInput = elements.namedItem('step') as HTMLInputElement | null;
    const amountInput = elements.namedItem('amount') as HTMLInputElement | null;

    if (delayInput && stepInput && amountInput) {
      let currentDelay: number = +delayInput.value;
      let currentStep: number = +stepInput.value;
      let currentAmount: number = +amountInput.value;
      if (currentAmount >= 0 && currentDelay >= 0 && currentDelay >= 0) {
        for (let i = 1; i <= currentAmount; i++) {
          createPromise(i, currentDelay)
            .then(({ position, delay }) =>
              Notiflix.Notify.success(
                `✅ Fulfilled promise ${position} in ${delay}ms`
              )
            )
            .catch(({ position, delay }) =>
              Notiflix.Notify.failure(
                `❌ Rejected promise ${position} in ${delay}ms`
              )
            );
          currentDelay += currentStep;
        }
      } else {
        Notiflix.Notify.warning('Input values cannot be negative numbers');
      }
    
    }
}
}

// function that creates and returns a promise
function createPromise(position: number, delay: number): Promise<{ position: number; delay: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve: boolean = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
