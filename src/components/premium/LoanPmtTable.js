import React, { useEffect, useState } from 'react';

import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

import { convertToFormattedRoundNumber, convertToInt, roundNumberToTwo } from '../../utils/utilFunctions';

const YearPaymentsRows = ({ calculateLoanBalance, monthlyPayment, year }) => {
  const [open, setOpen] = React.useState(false);
  const pmtsPerYearToShow = [1,2,3,4,5,6,7,8,9,10,11,12];
  const summaryPeriods = year * 12;

  const prevLoanBalance = calculateLoanBalance(summaryPeriods - 1);
  let currLoanBalance = calculateLoanBalance(summaryPeriods);
  let paidPrincipal = prevLoanBalance - currLoanBalance;
  const paidInterest = convertToFormattedRoundNumber(monthlyPayment - paidPrincipal);

  currLoanBalance = convertToFormattedRoundNumber(currLoanBalance);
  paidPrincipal = convertToFormattedRoundNumber(paidPrincipal);

  return (
    <>
      {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}> */}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{year}</TableCell>
        <TableCell align="right">{paidPrincipal}</TableCell>
        <TableCell align="right">{paidInterest}</TableCell>
        <TableCell align="right">{currLoanBalance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box sx={{ margin: 1 }}> */}
              <Typography variant="h6" gutterBottom component="div">
                Year Payments
              </Typography>
              <Table size="small" aria-label="Year Details">
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {pmtsPerYearToShow.map((p) => {
                      const periods = p * year;
                      const prevLB = calculateLoanBalance(periods - 1);
                      let currLB = calculateLoanBalance(periods);
                      let paidPrinc = prevLB - currLB;
                      const paidInt = convertToFormattedRoundNumber(monthlyPayment - paidPrinc);

                      currLB = convertToFormattedRoundNumber(currLB);
                      paidPrinc = convertToFormattedRoundNumber(paidPrinc);                    

                    return (
                      <TableRow key={periods}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell>{periods}</TableCell>
                        <TableCell align="right">{paidPrinc}</TableCell>
                        <TableCell align="right">{paidInt}</TableCell>
                        <TableCell align="right">{currLB}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            {/* </Box> */}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const LoanPmtTable = ({
  calculateLoanBalance,
  loanPrincipal,
  loanYears,
  monthlyPayment,
  pmtsPerYear
}) => {
  let yearsArray = [];
  for (let i=1; i <= 30; i++) {
    yearsArray.push(i);
  }

  // useEffect(() => {

  //   // eslint-disable-next-line
  // }, []); // react-hooks/exhaustive-deps

	return (
		<TableContainer sx={{ width: '97%' }} component={Paper}>
      <Table size="small" aria-label="payment table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Year</TableCell>
            <TableCell align="right">Principal Paid</TableCell>
            <TableCell align="right">Interest Paid</TableCell>
            <TableCell align="right">Remaining Loan Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {yearsArray.map((year, i) => ( 
            <YearPaymentsRows
              calculateLoanBalance={calculateLoanBalance}
              key={year}
              monthlyPayment={monthlyPayment}
              year={year}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	);
}

export default LoanPmtTable;
