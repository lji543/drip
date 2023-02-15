import React, { useEffect, useRef, useState } from 'react';

import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@mui/x-data-grid';

import ExpensesList from './utilComponents/ExpensesList';

import { months } from '../utils/ericConstants';
import useAuth from '../state/useAuth';
import useExpenses from '../state/useExpenses';
import { formatDate, convertToFormattedRoundNumber } from '../utils/utilFunctions';
import { categories } from '../utils/ericConstants';

const ExpensesListRecurring = () => {
  const { authenticatedUser } = useAuth();
  const { recurringExpenses, totalsByCategoryAndMonth, yearTotalsByCategory } = useExpenses();

  useEffect(() => {
    // console.log('->ExpensesListRecurring<- totalsByCategoryAndMonth ',totalsByCategoryAndMonth)

  // eslint-disable-next-line
  }, [yearTotalsByCategory, totalsByCategoryAndMonth]); // react-hooks/exhaustive-deps

  return (
    <div>
      <ExpensesList expenses={recurringExpenses}/>
    </div>
  );
}

export default ExpensesListRecurring;