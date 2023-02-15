export const getDownPayment = (downPmtPct, homeValue, downPmt) => {
  if (!downPmtPct || !homeValue || !downPmt) {
    return 0;
  } else if (!downPmtPct && homeValue && downPmt) {
    return getDownPaymentPct(homeValue, downPmt) * homeValue;
  } else if (!homeValue && downPmtPct && downPmt) {
    return downPmtPct * getHomeValue(downPmt, downPmtPct);
  } else {
    return downPmtPct * homeValue;
  }
}

export const getDownPaymentPct = (downPmt, homeValue, downPmtPct) => {
  if (!downPmt || !homeValue || !downPmtPct) {
    return 0;
  } else if (!downPmt && homeValue && downPmtPct) {
    return getDownPayment(downPmtPct, homeValue);
  } else if (!homeValue && downPmt && downPmtPct) {
    return getHomeValue(downPmt, downPmtPct);
  } else {
    return (downPmt / homeValue) * 100;
  }
}

export const getHomeValue = (downPmt, downPmtPct, homeValue) => {
  if (!downPmt || !downPmtPct || !homeValue) {
    return 0;
  } else if (!downPmt && downPmtPct && homeValue) {
    return getDownPayment(downPmtPct, homeValue) / downPmtPct;
  } else if (!downPmtPct && downPmt && homeValue) {
    return downPmt / getDownPaymentPct(0, homeValue, downPmt);
  } else {
    return downPmt / downPmtPct;
  }
}

export const getMonthlyPayment = (intRate, payments, principal) => {
  if (!intRate || !payments || !principal) return 0;
  // P * r * (1+r)^n / [(1+r)n-1]
    const nPow = Math.pow((1 + intRate), payments);
    const nLessOnePow = nPow - 1;

    return principal * intRate * (nPow / nLessOnePow);
}