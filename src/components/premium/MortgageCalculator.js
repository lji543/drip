import React, { useEffect, useState } from 'react';

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@mui/material';
import {
  Paid as PaidIcon,
  Payments as PaymentsIcon,
  Sell as SellIcon,
} from '@mui/icons-material';

import tealBlackName from '../../styles/assets/tealBlackName.png';
import tealBlackTagline from '../../styles/assets/tealBlackTagline.png';
import useAuth from '../../state/useAuth';
import { convertToFormattedRoundNumber } from '../../utils/utilFunctions';

const MortgageCalculator = () => {

  const [interestRate, setInterestRate] = useState(7);
  const [downPayment, setDownPayment] = useState(70000);
  const [homeValue, setHomeValue] = useState(620000);
  const [loanPrincipal, setLoanPrincipal] = useState(homeValue - downPayment);
  const [loanYears, setLoanYears] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [pmtsPerYear, setPmtsPerYear] = useState(12);

  const calculateLoanPrincipal = (target) => {
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

  const calculateMonthlyPayment = () => {
    let numberOfPayments = loanYears * pmtsPerYear;
    let adjRate = (interestRate / 100) / 12;

    let nPow = Math.pow((1 + adjRate), numberOfPayments);
    // console.log('nPow ',nPow)
    let nLessOnePow = nPow - 1;
    // console.log('nLessOnePow ',nLessOnePow)

    const monthlyPmt = loanPrincipal * adjRate * (nPow / nLessOnePow);
    // console.log('pmt ',monthlyPmt)
    setMonthlyPayment(convertToFormattedRoundNumber(monthlyPmt));
  }

  useEffect(() => {
    // calculateLoanPrincipal();
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
          onChange={(e) => calculateLoanPrincipal(e.target)}
          size="small"
          type="number"
          value={homeValue}
        />
        <TextField
          className="textField-background right-margin-12"
          id="downPayment"
          label="Down Payment"
          onChange={(e) => calculateLoanPrincipal(e.target)}
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
          <ListItemButton>
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>
            <ListItemText primary={`$ ${monthlyPayment}`} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
	);
}

export default MortgageCalculator;
