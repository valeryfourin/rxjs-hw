// Build a Mortgage Claculator using Rxjs and calculateMortgage method

import { fromEvent, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { calculateMortgage } from './calculate';

interface Mortgage {
  loanAmount?: number;
  loanInterest?: number;
  loanLength?: number;
}

let mortgageData: Mortgage = {};

// dom elements declaration
let amount: HTMLInputElement,
  rate: HTMLInputElement,
  duration: HTMLSelectElement,
  result: HTMLDivElement;

// dom elements assignation
amount = document.getElementById('loanAmount') as HTMLInputElement;
rate = document.getElementById('loanInterest') as HTMLInputElement;
duration = document.getElementById('loanLength') as HTMLSelectElement;
result = document.getElementById('result') as HTMLDivElement;

// dom events as observables - declaration
let amountChange$: Observable<InputEvent>;
let rateChange$: Observable<InputEvent>;
let durationChange$: Observable<InputEvent>;

// dom events as observables - assignation
amountChange$ = fromEvent<InputEvent>(amount, 'change');
rateChange$ = fromEvent<InputEvent>(rate, 'change');
durationChange$ = fromEvent<InputEvent>(duration, 'change');

function getValueFromInput(event: Observable<InputEvent>): Observable<string> {
  return event.pipe(
    map((event: InputEvent) => (event.target as HTMLInputElement).value)
  );
}

amountChange$.pipe(getValueFromInput).subscribe((amount) => {
  console.log('loan amount: ', amount);
  mortgageData.loanAmount = convertStrToNum(amount);
});

rateChange$.pipe(getValueFromInput).subscribe((rate) => {
  console.log('loan interest rate: ', rate);
  mortgageData.loanInterest = convertStrToNum(rate);
});

durationChange$.pipe(getValueFromInput).subscribe((duration) => {
  console.log('loan length: ', duration);
  mortgageData.loanLength = convertStrToNum(duration);
});

function convertStrToNum(str) {
  let num: number;
  try {
    num = parseInt(str);
  } catch (e) {
    console.error(e);
  }
  return num;
}

// subscribe to multiple observables. 
// evaluation performs only after all events are fired
combineLatest([amountChange$, rateChange$, durationChange$]).subscribe(
  () => {
    result.innerText = `Mortgage amount with 
    starter loan amount of ${mortgageData.loanAmount}, 
    interest rate of ${mortgageData.loanInterest}% 
    in ${mortgageData.loanLength} years will compound 
    ${calculateMortgage(
      mortgageData.loanInterest,
      mortgageData.loanAmount,
      mortgageData.loanLength
    )} of income`;
  },
  (err) => console.error(err)
);
