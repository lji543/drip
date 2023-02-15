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
import { getDownPayment, getHomeValue, getMonthlyPayment } from '../../utils/mortgageUtilFunctions';
import { convertToFormattedRoundNumber, convertToInt, roundNumberToTwo } from '../../utils/utilFunctions';

const MortgageCalculator = () => {

  const [beginningHomeValue, setBeginningHomeValue] = useState(620000);
  const [currentDownPayment, setCurrentDownPayment] = useState(124000); ///
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [downPayment, setDownPayment] = useState(currentDownPayment);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [loanPrincipal, setLoanPrincipal] = useState(beginningHomeValue - downPayment);
  const [estimatedClosingCosts, setEstimatedClosingCosts] = useState({
    percent: 5,
    total: (downPayment / (downPaymentPct / 100)) * 0.05,
  });
  const [housingMktGrowthRate, setHousingMktGrowthRate] = useState(4);
  const [interestRate, setInterestRate] = useState(7);
  const [loanBalance, setLoanBalance] = useState(0);
  const [loanYears, setLoanYears] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [pmtsPerYear, setPmtsPerYear] = useState(12);
  const [targetHomeValue, setTargetHomeValue] = useState(beginningHomeValue);

  const calculateAffordability = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
    // console.log('id: ',id, 'value: ', value)

    if (id === 'downPayment') {
      // let targetPct = (value / beginningHomeValue) * 100;
      let targetHomeValue = value / (downPaymentPct / 100);
      // console.log('targetHomeValue ',targetHomeValue)
  
      // setDownPaymentPct(convertToInt(targetPct));
      setDownPayment(value);
      setLoanPrincipal(targetHomeValue - value);
      setBeginningHomeValue(targetHomeValue);
    }
    if (id === 'targetDownPmtPerc') {
      // let targetDp = (value / 100) * beginningHomeValue;
      let targetHomeValue = downPayment / (value / 100);

      setDownPaymentPct(value);
      setLoanPrincipal(targetHomeValue - downPayment);
      setBeginningHomeValue(targetHomeValue);
    }
    if (id === 'targetHomeValue') {
      let targetDP = (downPaymentPct / 100) * value;

      setDownPayment(targetDP);
      setTargetHomeValue(value);
    }
  }

  const calculateClosingCosts = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
    const { percent, total } = estimatedClosingCosts;

    if (id === 'ccpercent') {
      setEstimatedClosingCosts({
        percent: value,
        total: convertToInt(beginningHomeValue * (value / 100)),
      });
    }
    if (id === 'cctotal') {
      setEstimatedClosingCosts({
        percent: convertToInt((value / beginningHomeValue) * 100),
        total: value,
      });
    }
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
    let futureHomeValue = beginningHomeValue * Math.pow(1 + adjRate, yrs);
    
    return futureHomeValue - currentBalance;
  }

  const calculateOriginalLoanPrincipal = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
    // console.log(id, ' -> ', value)

    if (target || (beginningHomeValue !== 0 && downPayment !== 0)) {
      if (id === 'downPayment') {
        setDownPayment(value);
        setLoanPrincipal(beginningHomeValue - value);
        // setBeginningHomeValue(); /////
      }
      if (id === 'beginningHomeValue') {
        setBeginningHomeValue(value);
        setLoanPrincipal(value - downPayment);
        // setDownPayment(); /////
      }
    }
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
    setMonthlyPayment(monthlyPmt);
  }

  const calculateTotalNeeded = (total) => {
    if (total === 'all') {
      // console.log('calculateTotalNeeded ',downPayment, estimatedClosingCosts)
      return convertToFormattedRoundNumber(downPayment + estimatedClosingCosts.total);
    }
    if (total === 'downpayment') {
      return convertToFormattedRoundNumber(downPayment - currentDownPayment);
    }
  }

  const calculatePaidPrincipalChange = (target) => {
    let { id, value } = target;
    value = convertToInt(value);
  }

  useEffect(() => {
    // calculateOriginalLoanPrincipal();
    // calculateLoanBalance();
    calculateEquity();
    calculateMonthlyPayment();
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
              <ListItemText primary={`$ ${calculateTotalNeeded('all')}`} />
            </ListItem>
          </List>
        </div>
        <div className='flex-column  right-margin-24'>
          <div className='form-title'>Loan Details:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="beginningHomeValue"
            label="Home Value"
            onChange={(e) => calculateOriginalLoanPrincipal(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={beginningHomeValue}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="downPayment"
            label="Down Payment"
            onChange={(e) => calculateOriginalLoanPrincipal(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={downPayment}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  {`${convertToInt(downPayment / beginningHomeValue * 100)}%`}
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
            value={loanPrincipal}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="interestRate"
            label="Interest Rate"
            onChange={(e) => setInterestRate(e.target.value)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={interestRate}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="loanYears"
            label="Loan Years"
            onChange={(e) => setLoanYears(e.target.value)}
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
            onChange={(e) => calculateEquity(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={housingMktGrowthRate}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="cctotal"
            label="Estimated Closing Costs"
            onChange={(e) => calculateClosingCosts(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={(estimatedClosingCosts.total)}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="ccpercent"
            label="Estimated Closing Costs %"
            onChange={(e) => calculateClosingCosts(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={estimatedClosingCosts.percent}
          />
          <div className='form-subtitle'>{`Total Needed: $ ${calculateTotalNeeded('all')}`}</div>
        </div>
        <div className='flex-column'>
          <div className='form-title'>Current Capability:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="currentDownPayment"
            label="Down Payment (What I have)"
            onChange={(e) => calculateAffordability(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={currentDownPayment}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="downPaymentPct"
            label="Down Payment %"
            onChange={(e) => calculateAffordability(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={downPaymentPct}
          />
          <div className='form-subtitle'>{`$ ${convertToFormattedRoundNumber(beginningHomeValue)} Home Value`}</div>
          <Divider className='divider' />
          <div className='form-title'>Target Capability:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="targetHomeValue"
            label="Desired Home Value"
            onChange={(e) => calculateAffordability(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={targetHomeValue}
          />
          <div className='form-subtitle'>{`Down Payment Needed: $ ${convertToFormattedRoundNumber(downPayment)}`}</div>
          <div className='form-subtitle'>{`Amount I need: $ ${calculateTotalNeeded('downpayment')}`}</div>
        </div>
      </div>
      <div className="flex-row top-margin-24">
        <LoanPmtTable
          calculateEquity={calculateEquity}
          calculateLoanBalance={calculateLoanBalance}
          calculatePaidPrincipalChange={calculatePaidPrincipalChange}
          loanPrincipal={loanPrincipal}
          loanYears={loanYears}
          monthlyPayment={monthlyPayment}
          pmtsPerYear={pmtsPerYear}
        />
      </div>
    </div>
	);
}

export default MortgageCalculator;
