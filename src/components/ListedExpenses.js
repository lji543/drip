// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { categories, months } from '../utils/ericConstants';
import useExpenses from '../useExpenses';
import { expenses } from '../utils/constants';

const columns = [
  {
    field: 'date',
    headerName: 'Date',
    headerClassName: 'dataGrid-column-header',
    editable: true,
  },
  {
    field: 'details',
    headerName: 'Details',
    headerClassName: 'dataGrid-column-header',
    editable: true,
    width: 224,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    headerClassName: 'dataGrid-column-header',
    editable: true,
    cellClassName: 'dataGrid-cell',
    width: 85,
  },
]

const tableContainerProps = {
  display: 'flex',
  width: '100%',
};

const styleProps = {
  border: 'none',
  borderColor: 'primary.light',
  '& .MuiDataGrid-cell:hover': {
    color: 'primary.main',
  },
  width: 410,
};

const ListedExpenses = ({ category, expenses, month}) => {
  const { totalsByMonthAndCategory } = useExpenses();
  const [expensesList, setExpensesList] = useState([]);
  const [monthCatTotal, setMonthCatTotal] = useState([]);
  // console.log('Listed Expenses ', expenses)

  const organizeExpensesList = () => {
    let newList = [];
    expenses.forEach((exp, i) => {
      newList.push({
        ...exp,
        amount: exp.amount?.toLocaleString('en-US'),
        id: i, // TODO: make this more specific for editing purposes
      });
    });

    setExpensesList(newList);
    setMonthCatTotal(totalsByMonthAndCategory[month][category])
  }

  useEffect(() => {
    organizeExpensesList();
  }, [expenses])

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: '100%', maxWidth: 'fit-content', padding: '12px 24px' }}>
        {expensesList.length > 0 && (
          <DataGrid
            rows={expensesList}
            columns={columns}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            sx={styleProps}
            rowHeight={25}
            hideFooter
          />
        )}
        <div className='dataGrid-total-row'>
          <div className='dataGrid-totalTxt'>Total:</div>
          <div className='dataGrid-totalAmt'>{`$ ${monthCatTotal}`}</div>
        </div>
      </div>
    </div>
  );
}

export default ListedExpenses;



{/* <Box sx={{ width: '100%' }}>
{expenses.map((exp, i) => {
  return (
    <div key={i}>
      <div>{exp.date}</div>
      <div>{exp.details}</div>
      <div>{exp.amount}</div>
    </div>
  )
})}
</Box> */}