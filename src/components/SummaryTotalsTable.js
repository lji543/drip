// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { categories, months } from '../utils/ericConstants';
import useExpenses from '../useExpenses';

const SummaryTotalsTable = () => {
  const { totalsByCategory, totalsByMonthAndCategory } = useExpenses();
  // console.log('Summary Totals Table totalsByCategory ',totalsByCategory)
  // console.log('Summary Totals Table totalsByMonthAndCategory ',totalsByMonthAndCategory)
  // console.log('Summary Totals Table months ',months)
  // const totalVariance = expenses.monthBudget - expenses._monthTotal;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right"></TableCell>
            {months.map((month, i) => {
              return <TableCell align="right" key={i}>{month}</TableCell>;
            })}
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
            {/* <TableCell align="right">Category</TableCell> */}
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {categories.map((cat) => {
              if (!totalsByCategory[cat]) return;
              const avg = totalsByCategory[cat].monthlyAvg ? Math.round(totalsByCategory[cat].monthlyAvg) : 0;
              const ttl = totalsByCategory[cat].total ? Math.round(totalsByCategory[cat].total) : 0;

              return (
                <TableRow
                  key={cat}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{totalsByCategory[cat].name}</TableCell>
                  <TableCell>{totalsByCategory[cat].details}</TableCell>
                  {months.map((month, i) => {
                    return <TableCell align="right" key={i}>{totalsByMonthAndCategory[i][cat]}</TableCell>;
                  })}
                  <TableCell align="right">{ttl}</TableCell>
                  <TableCell align="right"></TableCell>
                  {/* <TableCell align="right">{totalsByCategory[cat].name}</TableCell> */}
                  <TableCell align="right">{ttl}</TableCell>
                  <TableCell align="right">{avg}</TableCell>
                </TableRow>
              )
            })}
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SummaryTotalsTable;