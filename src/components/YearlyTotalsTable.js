// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { categories, getVariance } from '../utils/constants';
import useExpenses from '../useExpenses';

const TotalsTable = () => { // TODO: add timeframe as prop? so we can reuse this component
  const { totalsByCategory } = useExpenses();
  const totalVariance = getVariance(totalsByCategory.allBudget, totalsByCategory.allTotal);

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
          {categories.map((cat) => {
            const categoryExpenses = totalsByCategory[cat];
            const variance = getVariance(categoryExpenses.budget, categoryExpenses.total);

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
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">Total</TableCell>
            <TableCell align="right">{totalsByCategory.allTotal}</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{totalsByCategory.allBudget}</TableCell>
            <TableCell align="right">{totalVariance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TotalsTable;