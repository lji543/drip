import React, { useEffect, useState } from 'react';

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Balance as BalanceIcon,
  Home as HomeIcon,
  Paid as PaidIcon,
  Payments as PaymentsIcon,
  Sell as SellIcon,
} from '@mui/icons-material';

import LoanPmtTable from './LoanPmtTable';
import tealBlackName from '../../styles/assets/tealBlackName.png';
import tealBlackTagline from '../../styles/assets/tealBlackTagline.png';
import useAuth from '../../state/useAuth';
import { convertToFormattedRoundNumber, convertToInt, roundNumberToTwo } from '../../utils/utilFunctions';

const MortgageCalculator = () => {

  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [downPayment, setDownPayment] = useState(70000);
  const [homeValue, setHomeValue] = useState(620000);
  const [interestRate, setInterestRate] = useState(7);
  const [loanBalance, setLoanBalance] = useState(0);
  const [loanPrincipal, setLoanPrincipal] = useState(homeValue - downPayment);
  const [loanYears, setLoanYears] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [pmtsPerYear, setPmtsPerYear] = useState(12);

  const calculateOriginalLoanPrincipal = (target) => {
    const { id, value } = target;

    if (target || (homeValue !== 0 && downPayment !== 0)) {
      if (id === 'downPayment') {
        setDownPayment(value);
        setLoanPrincipal(homeValue - value);
      }
      if (id === 'homeValue') {
        setHomeValue(value);
        setLoanPrincipal(value - downPayment);
      }
    }
  }

  const calculateLoanBalance = (p) => {
    // P * [(1+r)^n - (1+r)^m] / [(1+r)^(n-1)]
    let period = p ?? currentPeriod;
    let numberOfPayments = loanYears * pmtsPerYear;
    let adjRate = (interestRate / 100) / 12;
    let nPow = Math.pow((1 + adjRate), numberOfPayments);
    let mPow = Math.pow((1 + adjRate), period);
    let nLessOnePow = nPow - 1;

    const remLoanBalance = loanPrincipal * [nPow - mPow] / nLessOnePow;
    // console.log(loanPrincipal, nPow, mPow, nLessOnePow)
    return roundNumberToTwo(remLoanBalance);
  }

  const calculateMonthlyPayment = () => {
    // P * r * (1+r)^n / [(1+r)n-1]
    let numberOfPayments = loanYears * pmtsPerYear;
    let adjRate = (interestRate / 100) / 12;
    let nPow = Math.pow((1 + adjRate), numberOfPayments);
    let nLessOnePow = nPow - 1;

    const monthlyPmt = loanPrincipal * adjRate * (nPow / nLessOnePow);
    // console.log('pmt ',monthlyPmt)
    // setMonthlyPayment(convertToFormattedRoundNumber(monthlyPmt));
    setMonthlyPayment(monthlyPmt);
  }

  useEffect(() => {
    // calculateOriginalLoanPrincipal();
    // calculateLoanBalance();
    calculateMonthlyPayment();
  // eslint-disable-next-line
  }, []); // react-hooks/exhaustive-deps

	return (
		<div className="">
      <div className='form flex-column top-margin-24'>
        <TextField
          className="textField-background right-margin-12"
          id="homeValue"
          label="Home Value"
          onChange={(e) => calculateOriginalLoanPrincipal(e.target)}
          size="small"
          type="number"
          value={homeValue}
        />
        <TextField
          className="textField-background right-margin-12"
          id="downPayment"
          label="Down Payment"
          onChange={(e) => calculateOriginalLoanPrincipal(e.target)}
          size="small"
          type="number"
          value={downPayment}
        />
        <TextField
          className="textField-background right-margin-12"
          disabled
          id="loanPrincipal"
          label="Loan Principal"
          size="small"
          type="number"
          value={loanPrincipal}
        />
        <TextField
          className="textField-background right-margin-12"
          id="interestRate"
          label="Interest Rate"
          onChange={(e) => setInterestRate(e.target.value)}
          size="small"
          type="number"
          value={interestRate}
        />
        <TextField
          className="textField-background right-margin-12"
          id="loanYears"
          label="Loan Years"
          onChange={(e) => setLoanYears(e.target.value)}
          size="small"
          type="number"
          value={loanYears}
        />
      </div>
      {/* <div className='form flex-column top-margin-24'>
        <div></div>
      </div> */}
      <List>
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
      </List>
      <br />
      <br />
      <br />
      <LoanPmtTable
        calculateLoanBalance={calculateLoanBalance}
        loanPrincipal={loanPrincipal}
        loanYears={loanYears}
        monthlyPayment={monthlyPayment}
        pmtsPerYear={pmtsPerYear}
      />
    </div>
	);
}

export default MortgageCalculator;
