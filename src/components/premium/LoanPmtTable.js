import React, { useEffect, useState } from 'react';

import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Item,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Balance as BalanceIcon,
  Home as HomeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Paid as PaidIcon,
  Payments as PaymentsIcon,
  Sell as SellIcon,
} from '@mui/icons-material';

import useMortgage from '../../state/useMortgage';
import { convertToFormattedRoundNumber, convertToInt, roundNumberToTwo } from '../../utils/utilFunctions';

const YearPaymentsRows = ({ handlePaidPrincipalChange, year }) => {
  const {
    calculateMortgageDetails,
    getCurrentEquity,
    getMortgageDetails,
    updateMortgageDetails,
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
    loanBalancesByPeriod,
    loanPrincipal,
    loanYears,
    monthlyPayment,
    pmtsPerYear,
    presentDayHomeValue,
    targetDownPayment,
    targetDownPaymentPct,
    targetHomeValue,
  } = useMortgage();
  const [open, setOpen] = React.useState(true);

  const pmtsPerYearToShow = [1,2,3,4,5,6,7,8,9,10,11,12];
  const summaryPeriods = year * 12;
  // console.log('loanPmtTable ', loanBalancesByPeriod)
  const prevLoanBalance = loanBalancesByPeriod[summaryPeriods - 1]?.loanBalance;
  let currLoanBalance = loanBalancesByPeriod[summaryPeriods]?.loanBalance;
  let paidPrincipal = prevLoanBalance - currLoanBalance;
  let addtlPaidPrincipal = 0;
  const paidInterest = convertToFormattedRoundNumber(monthlyPayment - paidPrincipal);
  const currentEquity = convertToFormattedRoundNumber(getCurrentEquity(summaryPeriods, currLoanBalance));

  currLoanBalance = convertToFormattedRoundNumber(currLoanBalance);
  paidPrincipal = convertToFormattedRoundNumber(paidPrincipal);

  return (
    <Grid container item xs={12}>
      <Grid item xs={12} className='table-row color-title-text'>
        {/* MAIN ROW / YR SUMMARY INFO */}
        <div className='table-gridCell-xs'>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </div>
        <div className='table-gridCell-xs textAlign-left'>{year}</div>
        <div className='table-gridCell-sm textAlign-left'>{paidPrincipal}</div>
        <div className='table-gridCell-sm textAlign-left'>{addtlPaidPrincipal}</div>
        <div className='table-gridCell-sm textAlign-left'>{paidInterest}</div>
        <div className='table-gridCell-med textAlign-left'>{currentEquity}</div>
        <div className='table-gridCell-med textAlign-left'>{currLoanBalance}</div>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
      <Collapse in={open} timeout="auto" unmountOnExit className='table-gridRowsContainer'>
        {/* <Grid xs={12} spacing={2}> */}
          <Grid container className='table-gridRowsContainer'>
            <Grid item xs={12} className='form-title left-margin-24'>
              {`Year ${year} Payments:`}
            </Grid>
            <Grid item xs={12} className='table-row bottom-padding-24 color-title-text'>
              {/* SUBSECTION HEADERS */}
              <div>Payment Num</div>
              <div>Date</div>
              <div>Principal Paid</div>
              <div>Additional Principal</div>
              <div>Total Principal</div>
              <div>Interest Paid</div>
              <div>Current Equity</div>
              <div>Rem Loan Balance</div>
            </Grid>
          </Grid>
          {pmtsPerYearToShow.map((pmtNum) => {
            const periods = pmtNum + ((year - 1) * 12);
            // const prevLB = loanBalancesByPeriod[periods - 1]?.loanBalance;
            let currLB = loanBalancesByPeriod[periods]?.loanBalance;
            const currOriginalLB = loanBalancesByPeriod[periods]?.originalLoanBalance;
            const prevOriginalLB = loanBalancesByPeriod[periods - 1]?.originalLoanBalance;
            // using what the lb would have been w/ no addtl pmts (bc monthly pmt doesn't change)
            let paidPrinc = prevOriginalLB - currOriginalLB;
            const addtlPaidPrinc = loanBalancesByPeriod[periods]?.addtlPaid;
            const totalPaidPrinc = convertToFormattedRoundNumber(paidPrinc + addtlPaidPrinc);
            const paidInt = 
              convertToFormattedRoundNumber(monthlyPayment - paidPrinc);
            const currEqu = convertToFormattedRoundNumber(getCurrentEquity(periods, currLB));

            currLB = convertToFormattedRoundNumber(currLB);
            paidPrinc = convertToFormattedRoundNumber(paidPrinc);

            return (
              <Grid container item xs={12} key={periods} className='table-row bottom-padding-12 color-title-text'>
                {/* SUBSECTION INFO ROWS */}
                <div className='table-gridCell-xs textAlign-right'>{periods}</div>
                <div className='table-gridCell-sm textAlign-right'>date</div>
                <div className='table-gridCell-sm'>{paidPrinc}</div>
                <div className='table-gridCell-med'>
                  <TextField
                    className="textField-small"
                    id="addtlPaidPrinc"
                    label="Additional"
                    onChange={(e) => handlePaidPrincipalChange(e.target, periods)}
                    size="small"
                    type="number"
                    // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                    // value={addtlPaidPrinc}
                    value={loanBalancesByPeriod[periods]?.addtlPaid}
                  />
                </div>
                <div className='table-gridCell-sm'>{totalPaidPrinc}</div>
                <div className='table-gridCell-sm'>{paidInt}</div>
                <div className='table-gridCell-sm'>{currEqu}</div>
                <div className='table-gridCell-sm'>{currLB}</div>
              </Grid>
            );
          })}
        {/* </Grid> */}
      </Collapse>
      </Grid>
    </Grid>
  );
}

const LoanPmtTable = ({
  calculateMortgageDetails,
  calculateEquity,
  calculatePaidPrincipalChange,
  loanPrincipal,
  loanYears,
  monthlyPayment,
  pmtsPerYear,
  setMiscDetails,
}) => {
  const { calculateWithAdditionalPrincipalPaid, getLoanBalances } = useMortgage();
  let yearsArray = [];
  // for (let i=1; i <= 30; i++) {
  for (let i = 1; i <= 3; i++) {
    yearsArray.push(i);
  }
  
  const handlePaidPrincipalChange = (target, periods) => {
    let { value } = target;
    value = convertToInt(value);
    // console.log('handlePaidPrincipalChange ',periods)
    calculateWithAdditionalPrincipalPaid(value, periods);
  }

  useEffect(() => {
    // eslint-disable-next-line
  }, []); // react-hooks/exhaustive-deps

	return (
		<Paper sx={{ width: '97%' }}>
      <Grid container>
        <Grid item xs={12} className='table-row form-title-large top-margin-24 color-title-text'>
          {/* MAIN ROW / YR SUMMARY / TABLE HEADERS */}
          <div className='table-gridCell-xs'></div>
          <div>Year</div>
          <div>Principal Paid</div>
          <div>Additional Principal Paid</div>
          <div>Interest Paid</div>
          <div>Current Equity</div>
          <div>Remaining Loan Balance</div>
        </Grid>
        {/* <div> */}
          {yearsArray.map((year, i) => ( 
            <YearPaymentsRows
              // calculateMortgageDetails={calculateMortgageDetails}
              // setMiscDetails={setMiscDetails}
              handlePaidPrincipalChange={handlePaidPrincipalChange}
              calculateEquity={calculateEquity}
              calculatePaidPrincipalChange={calculatePaidPrincipalChange}
              key={year}
              monthlyPayment={monthlyPayment}
              year={year}
            />
          ))}
        {/* </div> */}
      </Grid>
    </Paper>
	);
}

export default LoanPmtTable;
