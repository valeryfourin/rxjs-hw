export function calculateMortgage(loanInterest, loanAmount, loanLength) {
  const calculatedInterest = (loanInterest * 0.01) / 12;
  const total =
    (loanAmount * calculatedInterest) /
    (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));

  return total.toFixed(2);
}
