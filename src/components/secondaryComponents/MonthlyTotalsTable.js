// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { categories } from '../utils/ericConstants';

const MonthlyTotalsTable = ({ expenses }) => {
  // console.log('Monthly Totals Table expenses ',expenses);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Total</TableCell>
            {/* <TableCell align="right"></TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Variance</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {categories.map((cat) => {
              const categoryExpenses = expenses[cat];
              let categoryTotal;
            
            if (!categoryExpenses) {
              categoryTotal = 0;
            } else {
              categoryTotal = categoryExpenses;
            }
            // const catVariance = categoryExpenses.catBudget - categoryExpenses.catTotal;

              return (
                <TableRow
                  key={cat}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {cat}
                  </TableCell>
                  <TableCell align="right">{categoryTotal}</TableCell>
                  {/* <TableCell align="right"></TableCell>
                  <TableCell align="right">{categoryExpenses.catBudget}</TableCell>
                  <TableCell align="right">{catVariance}</TableCell> */}
                </TableRow>
              )
            })}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Total</TableCell>
              <TableCell align="right">{expenses._monthTotal}</TableCell>
              {/* <TableCell align="right"></TableCell>
              <TableCell align="right">{expenses.monthBudget}</TableCell>
              <TableCell align="right">{totalVariance}</TableCell> */}
            </TableRow>
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MonthlyTotalsTable;