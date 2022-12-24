import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import categories from '../utils/constants';

const TotalsTable = () => {

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
          {Object.keys(categories).map((cat) => {
            const category = categories[cat];
            const variance = category.budget - category.total;

            return (
              <TableRow
                key={cat}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cat}
                </TableCell>
                <TableCell align="right">{category.total}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{category.budget}</TableCell>
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