import React, { useEffect, useState } from 'react';

import {
  Button,
  Container,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  OutlinedInput,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  AddCard as AddCardIcon,
  AttachMoney as AttachMoneyIcon,
  Balance as BalanceIcon,
  EventRepeat as EventRepeatIcon,
  Home as HomeIcon,
  Paid as PaidIcon,
  Payments as PaymentsIcon,
  Sell as SellIcon,
} from '@mui/icons-material';

import LoanPmtTable from './LoanPmtTable';
import tealBlackName from '../../styles/assets/tealBlackName.png';
import tealBlackTagline from '../../styles/assets/tealBlackTagline.png';
import useAuth from '../../state/useAuth';
import useMortgage from '../../state/useMortgage';
import { getDownPayment, getHomeValue, getMonthlyPayment } from '../../utils/mortgageUtilFunctions';
import { convertToFormattedRoundNumber, convertToInt, roundNumber, roundNumberToTwo } from '../../utils/utilFunctions';

const MortgageCalculator = () => {
  const {
    calculateMortgageDetails,
    getMortgageDetails,
    updateMortgageDetails,
    currentCashOnHand,
    downPayment,
    downPaymentPct,
    estimatedClosingCosts,
    housingMktGrowthRate,
    interestRate,
    loanPrincipal,
    loanYears,
    monthlyPayment,
    pmtsPerYear,
    presentDayHomeValue,
  } = useMortgage();

  // const [currentCashOnHand, setCurrentCashOnHand] = useState(124000); ///
  const [currentPeriod, setCurrentPeriod] = useState(0);
  // const [downPayment, setDownPayment] = useState(currentCashOnHand);
  // const [downPaymentPct, setDownPaymentPct] = useState(20);
  // const [loanPrincipal, setLoanPrincipal] = useState(620000 - downPayment);
  // const [estimatedClosingCosts, setEstimatedClosingCosts] = useState({
  //   percent: 5,
  //   total: (downPayment / (downPaymentPct / 100)) * 0.05,
  // });
  // const [housingMktGrowthRate, setHousingMktGrowthRate] = useState(4);
  // const [interestRate, setInterestRate] = useState(7);
  const [loanBalance, setLoanBalance] = useState(0);
  // const [loanYears, setLoanYears] = useState(30);
  // const [monthlyPayment, setMonthlyPayment] = useState(0);
  // const [pmtsPerYear, setPmtsPerYear] = useState(12);
  // const [presentDayHomeValue, setPresentDayHomeValue] = useState(620000);
  const [targetHomeValue, setTargetHomeValue] = useState(presentDayHomeValue);

  const calculateAffordability = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
    calculateMortgageDetails(id, value);
    // console.log('id: ',id, 'value: ', value)

    // if (id === 'downPayment') {
    //   // let targetPct = (value / presentDayHomeValue) * 100;
    //   let targetHomeValue = value / (downPaymentPct / 100);
    //   // console.log('targetHomeValue ',targetHomeValue)
  
    //   // setDownPaymentPct(convertToInt(targetPct));
    //   setDownPayment(value);
    //   setLoanPrincipal(targetHomeValue - value);
    //   setPresentDayHomeValue(targetHomeValue);
    // }
    // if (id === 'targetDownPmtPerc') {
    //   // let targetDp = (value / 100) * presentDayHomeValue;
    //   let targetHomeValue = downPayment / (value / 100);

    //   setDownPaymentPct(value);
    //   setLoanPrincipal(targetHomeValue - downPayment);
    //   setPresentDayHomeValue(targetHomeValue);
    // }
    // if (id === 'targetHomeValue') {
    //   let targetDP = (downPaymentPct / 100) * value;

    //   setDownPayment(targetDP);
    //   setTargetHomeValue(value);
    // }
  }

  const calculateClosingCosts = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
    const { percent, total } = estimatedClosingCosts;
    calculateMortgageDetails(id, value);

    // if (id === 'ccpercent') {
    //   setEstimatedClosingCosts({
    //     percent: value,
    //     total: convertToInt(presentDayHomeValue * (value / 100)),
    //   });
    // }
    // if (id === 'cctotal') {
    //   setEstimatedClosingCosts({
    //     percent: convertToInt((value / presentDayHomeValue) * 100),
    //     total: value,
    //   });
    // }
  }

  const calculateLoanBalance = (p, addtlPmt) => {
    // P * [(1+r)^n - (1+r)^m] / [(1+r)^(n-1)]
    let addtlPaidPrincipal = addtlPmt || 0;
    let period = p ?? currentPeriod;
    let numberOfPayments = loanYears * pmtsPerYear;
    let adjRate = (interestRate / 100) / 12;
    let nPow = Math.pow((1 + adjRate), numberOfPayments);
    let mPow = Math.pow((1 + adjRate), period);
    let nLessOnePow = nPow - 1;

    const remLoanBalance = (loanPrincipal * [nPow - mPow] / nLessOnePow) - addtlPaidPrincipal;
    // console.log(loanPrincipal, nPow, mPow, nLessOnePow)
    return roundNumberToTwo(remLoanBalance);
  }

  const calculateEquity = (periods, currentBalance) => {
    // FV = PV * (1+r)^n
    let yrs = periods ? periods / 12 : loanYears;
    let adjRate = housingMktGrowthRate / 100;
    let futureHomeValue = presentDayHomeValue * Math.pow(1 + adjRate, yrs);
    
    return futureHomeValue - currentBalance;
  }

  const calculateOriginalLoanPrincipal = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
    // console.log(id, ' -> ', value)
    calculateMortgageDetails(id, value);

    // if (target || (presentDayHomeValue !== 0 && downPayment !== 0)) {
    //   if (id === 'downPayment') {
    //     setDownPayment(value);
    //     setLoanPrincipal(presentDayHomeValue - value);
    //     // setPresentDayHomeValue(); /////
    //   }
    //   if (id === 'presentDayHomeValue') {
    //     setPresentDayHomeValue(value);
    //     setLoanPrincipal(value - downPayment);
    //     // setDownPayment(); /////
    //   }
    // }
  }

  const handleMortgageDetailsChange = (target) => {
    let { id, value } = target;
    value = convertToInt(value);

    calculateMortgageDetails(id, value);
    // console.log('handle Change ', presentDayHomeValue)
  }

  const calculateMonthlyPayment = () => {
    // P * r * (1+r)^n / [(1+r)n-1]
    let numberOfPayments = loanYears * pmtsPerYear;
    let adjRate = (interestRate / 100) / 12;
    // let nPow = Math.pow((1 + adjRate), numberOfPayments);
    // let nLessOnePow = nPow - 1;

    // const monthlyPmt = loanPrincipal * adjRate * (nPow / nLessOnePow);
    const monthlyPmt = getMonthlyPayment(adjRate, numberOfPayments, loanPrincipal);
    // console.log('pmt ',monthlyPmt)
    // setMonthlyPayment(convertToFormattedRoundNumber(monthlyPmt));
    // console.log('getMonthlyPayment ',getMonthlyPayment(adjRate, 360, loanPrincipal))
    // setMonthlyPayment(monthlyPmt);
    
    // tally what's been updated and then run calculate?
    // calculateMortgageDetails('monthlyPayment', monthlyPmt);
  }

  const calculateTotalNeeded = (total) => {
    if (total === 'all') {
      // console.log('calculateTotalNeeded ',downPayment, estimatedClosingCosts)
      return convertToFormattedRoundNumber(downPayment + estimatedClosingCosts.total);
    }
    if (total === 'downpayment') {
      return convertToFormattedRoundNumber(downPayment - currentCashOnHand);
    }
  }

  const calculatePaidPrincipalChange = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
  }

  useEffect(() => {
    getMortgageDetails();
    // calculateOriginalLoanPrincipal();
    // calculateLoanBalance();
    calculateEquity(); //
    calculateMonthlyPayment(); //
  // eslint-disable-next-line
  }, []); // react-hooks/exhaustive-deps

	return (
		<div className="">
      <div className="flex-row">
        <div className='flex-column right-margin-68'>
          <div className='form-title'>Mortgage Summary:</div>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary={`$ ${convertToFormattedRoundNumber(monthlyPayment)}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <BalanceIcon />
              </ListItemIcon>
              <ListItemText primary={`$ ${convertToFormattedRoundNumber(loanPrincipal)}`} />
            </ListItem>
            <ListItem>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <EventRepeatIcon />
              </ListItemIcon>
              <ListItemText primary={`$ ${convertToFormattedRoundNumber(monthlyPayment)}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              {/* <ListItemText primary={`$ ${calculateTotalNeeded('all')}`} /> */}
            </ListItem>
          </List>
        </div>
        <div className='flex-column  right-margin-24'>
          <div className='form-title'>Loan Details:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="presentDayHomeValue"
            label="Home Value"
            onChange={(e) => handleMortgageDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={roundNumber(presentDayHomeValue)}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="downPayment"
            label="Down Payment"
            onChange={(e) => handleMortgageDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={roundNumber(downPayment)}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  {`${roundNumber(downPaymentPct)}%`}
                </InputAdornment>
            }}
          />
          <TextField
            className="textField-background bottom-padding-24"
            disabled
            id="loanPrincipal"
            label="Loan Principal"
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={roundNumber(loanPrincipal)}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="interestRate"
            label="Interest Rate"
            onChange={(e) => handleMortgageDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={interestRate}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="loanYears"
            label="Loan Years"
            onChange={(e) => handleMortgageDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={loanYears}
          />
        </div>
        <div className='flex-column  right-margin-24'>
          <div className='form-title'>Other Items:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="housingMktGrowthRate"
            label="Housing Market Est Growth"
            // onChange={(e) => calculateEquity(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={housingMktGrowthRate}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="cctotal"
            label="Estimated Closing Costs"
            // onChange={(e) => calculateClosingCosts(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            // value={(estimatedClosingCosts.total)}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="ccpercent"
            label="Estimated Closing Costs %"
            // onChange={(e) => calculateClosingCosts(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            // value={estimatedClosingCosts.percent}
          />
          {/* <div className='form-subtitle'>{`Total Needed: $ ${calculateTotalNeeded('all')}`}</div> */}
        </div>
        <div className='flex-column'>
          <div className='form-title'>Current Capability:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="currentCashOnHand"
            label="Down Payment (What I have)"
            // onChange={(e) => calculateAffordability(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={currentCashOnHand}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="downPaymentPct"
            label="Down Payment %"
            // onChange={(e) => calculateAffordability(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={downPaymentPct}
          />
          <div className='form-subtitle'>{`$ ${convertToFormattedRoundNumber(presentDayHomeValue)} Home Value`}</div>
          <Divider className='divider' />
          <div className='form-title'>Target Capability:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="targetHomeValue"
            label="Desired Home Value"
            // onChange={(e) => calculateAffordability(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={targetHomeValue}
          />
          <div className='form-subtitle'>{`Down Payment Needed: $ ${convertToFormattedRoundNumber(downPayment)}`}</div>
          {/* <div className='form-subtitle'>{`Amount I need: $ ${calculateTotalNeeded('downpayment')}`}</div> */}
        </div>
      </div>
      <div className="flex-row top-margin-24">
        {/* <LoanPmtTable
          calculateEquity={calculateEquity}
          calculateLoanBalance={calculateLoanBalance}
          calculatePaidPrincipalChange={calculatePaidPrincipalChange}
          loanPrincipal={loanPrincipal}
          loanYears={loanYears}
          monthlyPayment={monthlyPayment}
          pmtsPerYear={pmtsPerYear}
        /> */}
      </div>
    </div>
	);
}

export default MortgageCalculator;
