export const getVariance = (budget, total) => budget - total;

export const roundNumber = (num) => Math.round(num);

// two decimals
export const roundNumberToTwo = (num) => Math.round(num * 100) / 100;

export const convertToString = (str) => str?.toLocaleString('en-US');

export const convertToFormattedRoundNumber = (num) => {
  if (!num) {
    return 0;
  }
  return convertToString(Math.round(num));
};

export const convertToInt = (num) => parseInt(num);

export const convertToFloat = (num) => parseFloat(num);

export const formatDate = (d) => {
  const date = new Date(d);
  const newDate = date.toLocaleDateString("en-US");

  // const day = newDate.getDate();
  // const month = newDate.getMonth() +1;
  // const year = newDate.getFullYear().slice(-2);

  // return `${month}/${day}/${year}`;

  const length = newDate.length - 4;
  const year = newDate.slice(-2);
  const rest = newDate.slice(0,length);

  return `${rest}${year}`;
}