import { useContext } from 'react';
import { collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import { roundNumber } from '../utils/utilFunctions';
import useAuth from './useAuth';

const useMortgage = () => {
  const { mortgageDetailsBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  const userDocRef = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', "mortgage");
  const [mortgageDetails, setMortgageDetails] = mortgageDetailsBudgetContext;
  const [status, setStatus] = statusBudgetContext;

  const getDownPayment = (downPmtPct, homeValue) => {
    // console.log('getDownPayment ',downPmtPct, homeValue)
    if (!downPmtPct || !homeValue) return;
    // let newDownPayment = mortgageDetails.downPayment;

    // if (!downPmtPct && homeValue && downPmt) {
    //   newDownPayment = getDownPaymentPct(homeValue, downPmt) * homeValue;
    // } else if (!homeValue && downPmtPct && downPmt) {
    //   newDownPayment = downPmtPct * getHomeValue(downPmt, downPmtPct);
    // } else {
      // newDownPayment = downPmtPct * homeValue;
    // }
    // setMortgageDetails({
    //   ...mortgageDetails,
    //   downPayment: newDownPayment,
    // });
    return (downPmtPct / 100) * homeValue;
  }
  
  const getDownPaymentPct = (downPmt, homeValue) => {
    if (!downPmt || !homeValue) return;
    // let newDownPaymentPct = mortgageDetails.downPaymentPct;

    // if (!downPmt && homeValue && downPmtPct) {
    //   newDownPaymentPct = getDownPayment(downPmtPct, homeValue);
    // } else if (!homeValue && downPmt && downPmtPct) {
    //   newDownPaymentPct = getHomeValue(downPmt, downPmtPct);
    // } else {
    //   newDownPaymentPct = (downPmt / homeValue) * 100;
    // }
    // setMortgageDetails({
    //   ...mortgageDetails,
    //   downPaymentPct: newDownPaymentPct,
    // });
    // console.log('getDownPaymentPct ',downPmt, homeValue)
    return (downPmt / homeValue) * 100;
  }
  
  const getHomeValue = (downPmt, downPmtPct) => {
    if (!downPmt || !downPmtPct) return;
    // let newPresentDayHomeValue = mortgageDetails.presentDayHomeValue;

    // if (!downPmt && downPmtPct && homeValue) {
    //   newPresentDayHomeValue = getDownPayment(downPmtPct, homeValue) / downPmtPct;
    // } else if (!downPmtPct && downPmt && homeValue) {
    //   newPresentDayHomeValue = downPmt / getDownPaymentPct(0, homeValue, downPmt);
    // } else {
    //   newPresentDayHomeValue = downPmt / downPmtPct;
    // }
    // setMortgageDetails({
    //   ...mortgageDetails,
    //   presentDayHomeValue: newPresentDayHomeValue,
    // });
    // console.log('getHomeValue ',downPmt, downPmtPct)
    return downPmt / downPmtPct;
  }

  const getLoanPrincipal = (downPayment, homeValue) => {
    // P * [(1+r)^n - (1+r)^m] / [(1+r)^(n-1)]
    // console.log('getLoanPrincipal ',downPayment, homeValue)
    if (!downPayment || !homeValue) return;
    return homeValue - downPayment;
  }
  
  const getMonthlyPayment = (intRate, payments, principal) => {
    // P * r * (1+r)^n / [(1+r)n-1]
    if (!(intRate || payments) && !principal) return 0;
    // console.log('getMonthlyPayment ',intRate, payments, principal)
    // let newMonthlyPayment = mortgageDetails.monthlyPayment;
    const nPow = Math.pow((1 + (intRate / 100)), payments);
    const nLessOnePow = nPow - 1;

    // newMonthlyPayment = principal * (intRate / 100) * (nPow / nLessOnePow);
    // setMortgageDetails({
    //   ...mortgageDetails,
    //   monthlyPayment: newMonthlyPayment,
    // });
    return principal * (intRate / 100) * (nPow / nLessOnePow);
  }

  const calculateMortgageDetails = (id, value) => {
    // console.log('calculateMortgageDetails ',id, value);
    const {
      downPayment,
      downPaymentPct,
      interestRate,
      loanPrincipal,
      loanYears,
      monthlyPayment,
      pmtsPerYear,
      presentDayHomeValue
    } = mortgageDetails;

    // let newDownPayment, newDownPaymentPct, newLoanPrincipal, newMonthlyPayment = 0;
    let newDownPayment = downPayment;
    let newDownPaymentPct = downPaymentPct;
    let newInterestRate = interestRate;
    let newLoanPrincipal = loanPrincipal;
    let newLoanYears = loanYears;
    let newMonthlyPayment = monthlyPayment;
    let newPmtsPerYear = pmtsPerYear;
    let newPresentDayHomeValue = presentDayHomeValue;

    switch (id) {
      case 'downPayment':
        newDownPaymentPct = getDownPaymentPct(value, presentDayHomeValue);
        newLoanPrincipal = getLoanPrincipal(value, presentDayHomeValue);
        newDownPayment = value;
        break;
      case 'downPaymentPct':
        newDownPayment = getDownPayment(value, presentDayHomeValue);
        newLoanPrincipal = getLoanPrincipal(newDownPayment, presentDayHomeValue);
        newDownPaymentPct = value;
        break;
      case 'interestRate':
        const irPmts = pmtsPerYear * loanYears;
        newMonthlyPayment = getMonthlyPayment(value, irPmts, presentDayHomeValue);
        newInterestRate = value;
        break;
      case 'loanYears':
        const lyPmts = pmtsPerYear * value;
        newMonthlyPayment = getMonthlyPayment(interestRate, lyPmts, presentDayHomeValue);
        newLoanYears = value;
        break;
      case 'pmtsPerYear':
        const pyPmts = value * loanYears;
        newMonthlyPayment = getMonthlyPayment(interestRate, pyPmts, presentDayHomeValue);
        newPmtsPerYear = value;
        break;
      case 'presentDayHomeValue':
        const hvPmts = pmtsPerYear * loanYears;
        newDownPayment = getDownPayment(downPaymentPct, value);
        newLoanPrincipal = getLoanPrincipal(newDownPayment, value);
        newMonthlyPayment = getMonthlyPayment(interestRate, hvPmts, newLoanPrincipal);
        newPresentDayHomeValue = value;
        break;
      default:
        break;
    }
    const newMortgageDetailsState = {
      ...mortgageDetails,
      downPayment: newDownPayment,
      downPaymentPct: newDownPaymentPct,
      loanPrincipal: newLoanPrincipal,
      loanYears: newLoanYears,
      monthlyPayment: newMonthlyPayment,
      interestRate: newInterestRate,
      pmtsPerYear: newPmtsPerYear,
      presentDayHomeValue: newPresentDayHomeValue,
    }
    // console.log('calculateMortgageDetails ', newMortgageDetailsState)

    setMortgageDetails(newMortgageDetailsState);
    updateMortgageDetails(newMortgageDetailsState);

  }

  async function updateMortgageDetails(newMortgageDetailsState) {
    try {
      // console.log('doc update with: ',newOwedItemsState);
      // console.log('items update: ',owedItems);
      const mortgageDocRef = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', 'mortgage');
      await updateDoc(mortgageDocRef, {
        ...newMortgageDetailsState,
        timestamp: serverTimestamp(),
      });
      // setStatus({ uType, result: 'success' });
    } catch (err) {
      // setStatus({ uType, result: 'error'});
      console.log(err);
    }
  }

  async function getMortgageDetails() {
    await getDoc(userDocRef).then((mortgage) => {
      const mortgageData = mortgage.data();
      // console.log('***Firebase Mortgage Data ', mortgageData);

      setMortgageDetails(mortgageData);

    }).catch((err) => {
      console.log(err);
    })
  }

  const _adjustDatabaseMortgageDetails = async () => {
    try {
      // console.log('doc update with: ',newSpendingState.expensesByCategoryAndMonth[1]);
      const mortgage = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', 'mortgage');
      // console.log('mortgage update: ',spending);
      console.log('mortgage update: ',mortgage);
      await updateDoc(mortgage, {
        ...mortgageDetails,
        timestamp: serverTimestamp(),
      });
      // setStatus({ updateType, result: 'success' });
    } catch (err) {
      // setStatus({ updateType, result: 'error'});
      console.log(err);
    }
  }

  return {
    calculateMortgageDetails,
    getDownPayment,
    getDownPaymentPct,
    getHomeValue,
    getMortgageDetails,
    updateMortgageDetails,
    currentCashOnHand: mortgageDetails.currentCashOnHand,
    downPayment: mortgageDetails.downPayment,
    downPaymentPct: mortgageDetails.downPaymentPct,
    estimatedClosingCosts: mortgageDetails.estimatedClosingCosts,
    housingMktGrowthRate: mortgageDetails.housingMktGrowthRate,
    interestRate: mortgageDetails.interestRate,
    loanPrincipal: mortgageDetails.loanPrincipal,
    loanYears: mortgageDetails.loanYears,
    monthlyPayment: mortgageDetails.monthlyPayment,
    pmtsPerYear: mortgageDetails.pmtsPerYear,
    presentDayHomeValue: mortgageDetails.presentDayHomeValue,
    // tester: mortgageDetails.presentDayHomeValue,
  }
};

export default useMortgage;