import { useContext } from 'react';
import { collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import { roundNumber, roundNumberToTwo } from '../utils/utilFunctions';
import useAuth from './useAuth';

const useMortgage = () => {
  const { mortgageDetailsBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  const userDocRef = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', "mortgage");
  const [mortgageDetails, setMortgageDetails] = mortgageDetailsBudgetContext;
  const [status, setStatus] = statusBudgetContext;

  const {
    loanBalancesByPeriod,
    additionalPaid,
    currentAffordableHomeValue,
    currentCashNeeded,
    currentCashOnHand,
    downPayment,
    downPaymentPct,
    estimatedClosingCostsPct,
    estimatedClosingCostsTotal,
    housingMktGrowthRate,
    interestRate,
    loanPrincipal,
    loanYears,
    monthlyPayment,
    pmtsPerYear,
    presentDayHomeValue,
    targetDownPayment,
    targetDownPaymentPct,
    targetHomeValue,
  } = mortgageDetails;

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

  const getLoanBalances = (newLoanBalances) => {
    // P * [(1+r)^n - (1+r)^m] / [(1+r)^(n-1)]
    let newLoanBalancesByPeriod = newLoanBalances || loanBalancesByPeriod;
  
    const numberOfPayments = loanYears * pmtsPerYear;
    const adjRate = (interestRate / 100) / 12;
    const nPow = Math.pow((1 + adjRate), numberOfPayments);

    let totalAdditional = 0;
    return newLoanBalancesByPeriod.map((loanObj, i) => {
      totalAdditional += loanObj.addtlPaid;
      const adjLoanPrincipal = loanPrincipal - totalAdditional;
      // const adjLoanPrincipal = loanPrincipal;
      // if (i <4){
      //   console.log('newLoanBalance ',i, loanObj.addtlPaid,totalAdditional,adjLoanPrincipal)
      // }
      const mPow = Math.pow((1 + adjRate), i);
      const nLessOnePow = nPow - 1;
      const newBalance = (adjLoanPrincipal * [nPow - mPow] / nLessOnePow);
      loanObj.loanBalance = newBalance;
      // loanObj.originalLoanBalance = newBalance;
      return loanObj;
    });
  }

  const getCurrentEquity = (periods, currentBalance) => {
    // FV = PV * (1+r)^n
    let yrs = periods ? periods / 12 : loanYears;
    let adjRate = housingMktGrowthRate / 100;
    let futureHomeValue = presentDayHomeValue * Math.pow(1 + adjRate, yrs);
    
    return futureHomeValue - currentBalance;
  }

  const getLoanPrincipal = (downPayment, homeValue) => {
    // P * [(1+r)^n - (1+r)^m] / [(1+r)^(n-1)]
    // console.log('getLoanPrincipal ',downPayment, homeValue)
    if (!downPayment || !homeValue) return;
    return homeValue - downPayment;
  }
  
  const getMonthlyPayment = (intRate, payments, downPmt, homeValue) => {
    // P * r * (1+r)^n / [(1+r)^n-1]
    // if (!(intRate || payments) && !homeValue) return 0;
    // console.log('getMonthlyPayment ',intRate, payments, downPmt, homeValue);
    const principal = homeValue - downPmt;
    const adjRate = intRate / 100 / 12;
    const nPow = Math.pow((1 + adjRate), payments);
    const nLessOnePow = nPow - 1;

    // console.log('getMonthlyPayment ',principal * adjRate * (nPow / nLessOnePow));
    return principal * adjRate * (nPow / nLessOnePow);
  }

  const calculateWithAdditionalPrincipalPaid = (value, period) => {
    let newMonthlyPayment = monthlyPayment;
    let newLoanBalancesByPeriod = [...loanBalancesByPeriod];
    // let newLoanBalancesByPeriod = loanBalancesByPeriod;
    // console.log('handlePaidPrincipalChange ',loanBalancesByPeriod);
    // console.log('handlePaidPrincipalChange ',newLoanBalancesByPeriod);
    newLoanBalancesByPeriod[period] = {
      ...newLoanBalancesByPeriod[period],
      addtlPaid: value
    }
    // console.log('handlePaidPrincipalChange ',period);
    // console.log('1 handlePaidPrincipalChange ',newLoanBalancesByPeriod[period].loanBalance);

    
    // newLoanBalancesByPeriod.forEach((loanObj) => {

    // })
    // console.log('handlePaidPrincipalChange ',period, value);
    const numOfPmts = pmtsPerYear * loanYears;
    newLoanBalancesByPeriod = getLoanBalances(newLoanBalancesByPeriod);
    // console.log('2 handlePaidPrincipalChange ',newLoanBalancesByPeriod[period].loanBalance);
    // newMonthlyPayment = // TODO: I don't think the monthly payment will change, just the future loan balances
      // getMonthlyPayment(interestRate, numOfPmts, downPayment, newLoanBalancesByPeriod[period].loanBalance);
    // console.log('handlePaidPrincipalChange ',newLoanBalancesByPeriod);


    let newMortgageDetails = {
      ...mortgageDetails,
      loanBalancesByPeriod: newLoanBalancesByPeriod,
      // monthlyPayment: newMonthlyPayment,
    }

    setMortgageDetails(newMortgageDetails);
    updateMortgageDetails(newMortgageDetails);
  }

  const setMiscDetails = (id, value) => {
    let newMortgageDetails = {
      ...mortgageDetails,
      [id]: value,
    }
    
    switch (id) {
      case 'currentCashOnHand':
        // const newTHV = roundNumber(value / (targetDownPaymentPct / 100));
        const targetDPP = (targetDownPaymentPct / 100) || 0.2;
        const newTHV = getHomeValue(value, targetDPP);
        // console.log(id, value, newTHV);
        newMortgageDetails = {
          ...newMortgageDetails,
          currentCashNeeded: targetDownPayment - currentCashOnHand,
          currentAffordableHomeValue: newTHV,
        }
        break;
      case 'targetDownPaymentPct':
        // const newTDP = roundNumber((targetDownPaymentPct / 100) * targetHomeValue);
        const targetHV = targetHomeValue || currentAffordableHomeValue;
        const newTDP = roundNumber(getDownPayment((value / 100), targetHV));
        newMortgageDetails = {
          ...newMortgageDetails,
          currentAffordableHomeValue: getHomeValue(targetDownPayment, value),
          currentCashNeeded: newTDP - currentCashOnHand,
          targetDownPayment: newTDP,
        }
        break;
      case 'estimatedClosingCostsPct':
        newMortgageDetails = {
          ...newMortgageDetails,
          estimatedClosingCostsTotal: presentDayHomeValue * (value / 100),
        }
        break;
      case 'estimatedClosingCostsTotal':
        const newCCPct = 
        roundNumberToTwo((value / presentDayHomeValue) * 100);
        // console.log(id, value, newCCPct);
        newMortgageDetails = {
          ...newMortgageDetails,
          estimatedClosingCostsPct: newCCPct,
        }
      break;
      case 'targetHomeValue':
        const newTDPmt = roundNumber((targetDownPaymentPct / 100) * value);
        newMortgageDetails = {
          ...newMortgageDetails,
          currentCashNeeded: newTDPmt - currentCashOnHand,
          targetDownPayment: newTDPmt,
        }
        break;
      default:
        break;
    }

    setMortgageDetails(newMortgageDetails);
    updateMortgageDetails(newMortgageDetails);
  }

  const calculateMortgageDetails = (id, value) => {
    // console.log('calculateMortgageDetails ',id, value);
    let newDownPayment = downPayment;
    let newDownPaymentPct = downPaymentPct;
    let newEstimatedClosingCostsTotal = estimatedClosingCostsTotal;
    let newInterestRate = interestRate;
    let newLoanBalancesByPeriod = loanBalancesByPeriod;
    let newLoanPrincipal = loanPrincipal;
    let newLoanYears = loanYears;
    let newMonthlyPayment = monthlyPayment;
    let newPmtsPerYear = pmtsPerYear;
    let newPresentDayHomeValue = presentDayHomeValue;

    let numOfPmts = pmtsPerYear * loanYears;

    switch (id) {
      case 'downPayment':
        newDownPaymentPct = getDownPaymentPct(value, presentDayHomeValue);
        newLoanPrincipal = getLoanPrincipal(value, presentDayHomeValue);
        newDownPayment = value;
        newMonthlyPayment = getMonthlyPayment(interestRate, numOfPmts, value, presentDayHomeValue);
        newLoanBalancesByPeriod = getLoanBalances();
        break;
      case 'downPaymentPct':
        newDownPayment = getDownPayment(value, presentDayHomeValue);
        newLoanPrincipal = getLoanPrincipal(newDownPayment, presentDayHomeValue);
        newDownPaymentPct = value;
        newMonthlyPayment = getMonthlyPayment(value, numOfPmts, newDownPayment, presentDayHomeValue);
        newLoanBalancesByPeriod = getLoanBalances();
        break;
      case 'interestRate':
        newMonthlyPayment = getMonthlyPayment(value, numOfPmts, downPayment, presentDayHomeValue);
        newInterestRate = value;
        newLoanBalancesByPeriod = getLoanBalances();
        break;
      case 'loanYears':
        numOfPmts = pmtsPerYear * value;
        newMonthlyPayment = getMonthlyPayment(interestRate, numOfPmts, downPayment, presentDayHomeValue);
        newLoanYears = value;
        newLoanBalancesByPeriod = getLoanBalances();
        break;
      case 'pmtsPerYear':
        numOfPmts = value * loanYears;
        newMonthlyPayment = getMonthlyPayment(interestRate, numOfPmts, downPayment, presentDayHomeValue);
        newPmtsPerYear = value;
        newLoanBalancesByPeriod = getLoanBalances();
        break;
      case 'presentDayHomeValue':
        newDownPayment = getDownPayment(downPaymentPct, value);
        newLoanPrincipal = getLoanPrincipal(newDownPayment, value);
        newMonthlyPayment = getMonthlyPayment(interestRate, numOfPmts, newDownPayment, value);
        newEstimatedClosingCostsTotal = (estimatedClosingCostsPct / 100) * value;
        newPresentDayHomeValue = value;
        newLoanBalancesByPeriod = getLoanBalances();
        // console.log('calculateMortgageDetails ', newLoanBalancesByPeriod)
        break;
      default:
        break;
    }

    const newMortgageDetails = {
      ...mortgageDetails,
      downPayment: newDownPayment,
      downPaymentPct: newDownPaymentPct,
      estimatedClosingCostsTotal: newEstimatedClosingCostsTotal,
      loanBalancesByPeriod: newLoanBalancesByPeriod,
      loanPrincipal: newLoanPrincipal,
      loanYears: newLoanYears,
      monthlyPayment: newMonthlyPayment,
      interestRate: newInterestRate,
      pmtsPerYear: newPmtsPerYear,
      presentDayHomeValue: newPresentDayHomeValue,
    }
    // console.log('calculateMortgageDetails ', newMortgageDetails)
    // console.log('calculateMortgageDetails ', newMortgageDetails.loanBalancesByPeriod)

    setMortgageDetails(newMortgageDetails);
    updateMortgageDetails(newMortgageDetails);

  }

  async function updateMortgageDetails(newMortgageDetails) {
    try {
      // console.log('doc update with: ',newOwedItems);
      // console.log('items update: ',owedItems);
      const mortgageDocRef = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', 'mortgage');
      await updateDoc(mortgageDocRef, {
        ...newMortgageDetails,
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
    calculateWithAdditionalPrincipalPaid,
    getCurrentEquity,
    getDownPayment,
    getDownPaymentPct,
    getHomeValue,
    getLoanBalances,
    getMortgageDetails,
    setMiscDetails,
    updateMortgageDetails,
    loanBalancesByPeriod, // TODO:
    additionalPaid, // TODO:
    currentAffordableHomeValue,
    currentCashNeeded,
    currentCashOnHand,
    downPayment,
    downPaymentPct,
    estimatedClosingCostsPct,
    estimatedClosingCostsTotal,
    housingMktGrowthRate,
    interestRate,
    loanPrincipal,
    loanYears,
    monthlyPayment,
    pmtsPerYear,
    presentDayHomeValue,
    targetDownPayment,
    targetDownPaymentPct,
    targetHomeValue,
  }
};

export default useMortgage;

    
    
    // TODO: going to need to initialize this if nothing is there (new user)
    // console.log('1 remainingLoanBalance ',newLoanBalancesByPeriod)
    // let newLoanBalancesByPeriod = [];
    // for (let i = 0; i < numberOfPayments; i++) {
    //   let remLoanBalance = 0;
    //   let mPow = Math.pow((1 + adjRate), i);
    //   let nLessOnePow = nPow - 1;
    //   remLoanBalance = (loanPrincipal * [nPow - mPow] / nLessOnePow);
    //   // console.log('remainingLoanBalance ',remLoanBalance)
    //   newLoanBalancesByPeriod.push({
    //     addtlPaid: 0,
    //     loanBalance: remLoanBalance,
    //   });
    // }
    // console.log('2 remainingLoanBalance ',newLoanBalancesByPeriod)
    // return newLoanBalancesByPeriod;