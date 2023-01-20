import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { months } from '../utils/constants'
import Tabs from './utilComponents/Tabs';
import MonthlyTotalsTable from './MonthlyTotalsTable';
import useExpenses from '../useExpenses';

const testTabs = [
  {
    label: 'Jan',
    panel: 'JANUARY',
  },
  {
    label: 'Feb',
    panel: 'February',
  },
  {
    label: 'Mar',
    panel: 'JANUARY',
  },
  {
    label: 'Apr',
    panel: 'JANUARY',
  },
  {
    label: 'May',
    panel: 'JANUARY',
  },
  {
    label: 'Jun',
    panel: 'JANUARY',
  },
  {
    label: 'Jul',
    panel: 'JANUARY',
  },
  {
    label: 'Aug',
    panel: 'JANUARY',
  },
  {
    label: 'Sep',
    panel: 'JANUARY',
  },
  {
    label: 'Oct',
    panel: 'JANUARY',
  },
  {
    label: 'Nov',
    panel: 'JANUARY',
  },
  {
    label: 'Dec',
    panel: 'JANUARY',
  },
]

const ExpensesByMonth = () => {
  const { expensesByMonthAndCategory } = useExpenses();
  const [tabContent, setTabContent] = useState();

  const organizeTabContent = () => {
    // console.log('expensesByMonth ',expensesByMonth)
    months.map((m, i) => {
      return testTabs[i].panel = <MonthlyTotalsTable expenses={expensesByMonthAndCategory[i]} />;
    });
    // console.log('ExpensesByMonth ',testTabs)
    setTabContent(testTabs);
  }

  useEffect(() => {
    organizeTabContent();
  }, [expensesByMonthAndCategory])

  return (
  <Box sx={{ width: '100%' }}>
    <Tabs tabContent={tabContent} />
  </Box>
  );
} 

export default ExpensesByMonth;