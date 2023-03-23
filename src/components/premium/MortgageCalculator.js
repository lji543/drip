import React, { useEffect } from 'react';

import {
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import {
  // AccessTime as AccessTimeIcon,
  // AddCard as AddCardIcon,
  AttachMoney as AttachMoneyIcon,
  Balance as BalanceIcon,
  EventRepeat as EventRepeatIcon,
  // Home as HomeIcon,
  // Paid as PaidIcon,
  Payments as PaymentsIcon,
  // Sell as SellIcon,
} from '@mui/icons-material';

import LoanPmtTable from './LoanPmtTable';
import useMortgage from '../../state/useMortgage';
// import { getDownPayment, getHomeValue, getMonthlyPayment } from '../../utils/mortgageUtilFunctions';
import { convertToFormattedRoundNumber, convertToInt, roundNumber, roundNumberToTwo } from '../../utils/utilFunctions';

const MortgageCalculator = () => {
  const {
    calculateMortgageDetails,
    getMortgageDetails,
    // updateMortgageDetails,
    setMiscDetails,
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
  } = useMortgage();

  const addClosingCosts = (currentCost) => {
    return ((estimatedClosingCostsPct / 100) * currentCost) + currentCost;
  }

  const hvIncludingClosingCosts = (cash) => {
    const adjCCPct = estimatedClosingCostsPct / 100;
    const adjDPPct = targetDownPaymentPct / 100;
    // console.log('includingClosingCosts ', currentCashOnHand / (adjCCPct + adjDPPct))
    return cash / (adjCCPct + adjDPPct);
  }

  const calculateLoanBalance = (p, addtlPmt) => {
    // P * [(1+r)^n - (1+r)^m] / [(1+r)^(n-1)]
    let addtlPaidPrincipal = addtlPmt || 0;
    let period = p // ?? currentPeriod;
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

  const handleMiscDetailsChange = (target) => {
    let { id, value } = target;
    // console.log(id, value);
    value = convertToInt(value);
    
    setMiscDetails(id, value); // TODO: may have to adj somewhere else to propogate LoanPmtTable
  }

  useEffect(() => {
    getMortgageDetails();
  // eslint-disable-next-line
  }, []); // react-hooks/exhaustive-deps

	return (
		<div className="page-wrapper">
      <div className="flex-row">
        {/* SUMMARY COLUMNN */}
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
              <ListItemText primary={`$ ${convertToFormattedRoundNumber(downPayment + estimatedClosingCostsTotal)}`} />
            </ListItem>
          </List>
        </div>
        {/* LOAN INFO COLUMNN */}
        <div className='flex-column right-margin-24'>
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
        {/* OTHER ITEMS COLUMNN */}
        <div className='flex-column right-margin-68'>
          <div className='form-title'>Other Items:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="housingMktGrowthRate"
            label="Housing Market Est Growth"
            onChange={(e) => handleMiscDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={housingMktGrowthRate}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="estimatedClosingCostsTotal"
            label="Estimated Closing Costs"
            onChange={(e) => handleMiscDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={convertToInt(estimatedClosingCostsTotal)}
          />
          <TextField
            className="textField-background bottom-padding-24"
            id="estimatedClosingCostsPct"
            label="Estimated Closing Costs %"
            onChange={(e) => handleMiscDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={estimatedClosingCostsPct}
          />
          {/* <div className='form-subtitle'>{`Total Needed: $ ${calculateTotalNeeded('all')}`}</div> */}
        </div>
        {/* AFFORDABILITY COLUMNN */}
        <div className='flex-column right-margin-24'>
          <div className='form-title'>Review Affordability:</div>
          <TextField
            className="textField-background bottom-padding-24"
            id="currentCashOnHand"
            label="Down Payment (What I have)"
            onChange={(e) => handleMiscDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={currentCashOnHand}
          />
          <TextField
            disabled={!currentCashOnHand && !targetHomeValue}
            className="textField-background bottom-padding-24"
            id="targetDownPaymentPct"
            label="Target Down Payment %"
            onChange={(e) => handleMiscDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={targetDownPaymentPct}
          />
          <div className='form-subtitle bottom-padding-12'>{`Affordable Home Value: $ ${convertToFormattedRoundNumber(currentAffordableHomeValue)}`}</div>

          <Divider className='divider' />
          
          <TextField
            className="textField-background bottom-padding-24"
            id="targetHomeValue"
            label="Desired Home Value"
            onChange={(e) => handleMiscDetailsChange(e.target)}
            size="small"
            type="number"
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
            value={targetHomeValue}
          />
          <div className='form-subtitle'>{`Down Payment Needed: $ ${convertToFormattedRoundNumber(targetDownPayment)}`}</div>
          <div className='form-subtitle'>{`Amount I need: $ ${convertToFormattedRoundNumber(currentCashNeeded)}`}</div>
        </div>
        {/* AFFORDABILITY SUMMARY COLUMNN */}
        <div className='flex-column'>
          <div className='form-title'>Current Capability:</div>
          <div className='form-subtitle border'>
            <div className='bottom-padding-12'>Including Closing Costs:</div>
            <div>{`Down Payment: $ ${convertToFormattedRoundNumber((targetDownPaymentPct/100) * hvIncludingClosingCosts(currentCashOnHand))}`}</div>
            <div>{`Closing Costs (${estimatedClosingCostsPct}%): $ ${convertToFormattedRoundNumber((estimatedClosingCostsPct/100) * hvIncludingClosingCosts(currentCashOnHand))}`}</div>
            {`Home Value:  $ ${convertToFormattedRoundNumber(hvIncludingClosingCosts(currentCashOnHand))}`}
          </div>

          <Divider className='divider' />

          <div className='form-title'>Target:</div>
          <div className='form-subtitle border'>
            <div className='bottom-padding-12'>Including Closing Costs:</div>
            <div>{`Down Payment: $ ${convertToFormattedRoundNumber(targetDownPayment)}`}</div>
            <div>
              {`Closing Costs (${estimatedClosingCostsPct}%): $ ${convertToFormattedRoundNumber((estimatedClosingCostsPct/100) * hvIncludingClosingCosts(targetDownPayment))}`}
            </div>
            <br />
            {`Amount Needed:  $ ${convertToFormattedRoundNumber(targetDownPayment + ((estimatedClosingCostsPct/100) * hvIncludingClosingCosts(targetDownPayment)))}`}
          </div>
        </div>
      </div>
      <div className="flex-row top-margin-24">
        <LoanPmtTable
          calculateEquity={calculateEquity}
          calculateLoanBalance={calculateLoanBalance}
          calculateMortgageDetails={calculateMortgageDetails}
          setMiscDetails={setMiscDetails}
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
