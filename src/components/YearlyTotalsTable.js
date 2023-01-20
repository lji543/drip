// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import useExpenses from '../useExpenses';

const TotalsTable = ({ expenses }) => {
  // const { expensesByCategory, expensesByMonth } = useExpenses();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Variance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(expenses).map((cat) => {
            const categoryExpenses = expenses[cat];
            const variance = categoryExpenses.budget - categoryExpenses.total;

            return (
              <TableRow
                key={cat}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cat}
                </TableCell>
                <TableCell align="right">{categoryExpenses.total}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{categoryExpenses.budget}</TableCell>
                <TableCell align="right">{variance}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TotalsTable;