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
import useExpenses from '../state/useExpenses';

const SummaryTotalsTable = () => {
  const { totalsByCategory, totalsByCategoryAndMonth } = useExpenses();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className='table-column-header-lg'>Category</TableCell>
            <TableCell align="right"></TableCell>
            {months.map((month, i) => {
              return <TableCell className='table-column-header' align="right" key={`${i}${month}`}>{month}</TableCell>;
            })}
            <TableCell align="right"></TableCell>
            <TableCell className='table-column-header-lg' align="right">Total</TableCell>
            {/* <TableCell align="right">Category</TableCell> */}
            {/* <TableCell className='table-column-header-lg' align="right">Total</TableCell> */}
            <TableCell className='table-column-header-lg' align="right">Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {categories.map((cat , i) => {
              if (!totalsByCategory[cat]) return null;
              const avg = totalsByCategory[cat].monthlyAvg ? Math.round(totalsByCategory[cat].monthlyAvg) : 0;
              const ttl = totalsByCategory[cat].total ? Math.round(totalsByCategory[cat].total) : 0;

              return (
                <TableRow
                  key={`${cat}${i}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className='table-row-header' component="th" scope="row">{totalsByCategory[cat].name}</TableCell>
                  <TableCell className='table-cell'>{totalsByCategory[cat].details}</TableCell>
                  {months.map((month, i) => {
                    return <TableCell className='table-cell' align="right" key={i}>{totalsByCategoryAndMonth[i][cat]}</TableCell>;
                  })}
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{ttl}</TableCell>
                  {/* <TableCell align="right">{totalsByCategory[cat].name}</TableCell> */}
                  {/* <TableCell align="right">{ttl}</TableCell> */}
                  <TableCell align="right">{avg}</TableCell>
                </TableRow>
              );
            })}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell className='table-row-header' component="th" scope="row"></TableCell>
              <TableCell className='table-cell'></TableCell>
              {months.map((month, i) => {
                return <TableCell key={`${month}${i}`} className='table-cell' align="right">{totalsByCategoryAndMonth[i]._monthTotal}</TableCell>;
              })}
              <TableCell align="right"></TableCell>
              <TableCell align="right">{totalsByCategoryAndMonth._yearTotal}</TableCell>
              {/* <TableCell align="right">{totalsByCategory[cat].name}</TableCell> */}
              {/* <TableCell align="right">{ttl}</TableCell> */}
              <TableCell align="right">{totalsByCategoryAndMonth._yearAverage}</TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SummaryTotalsTable;