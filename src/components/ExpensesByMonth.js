import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { months } from '../utils/ericConstants'
import Tabs from './utilComponents/Tabs';
import MonthlyTotalsTable from './MonthlyTotalsTable';
import useExpenses from '../state/useExpenses';

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
  const { totalsByCategoryAndMonth } = useExpenses();
  const [tabContent, setTabContent] = useState();
  const [currentMonth, setCurrentMonth] = useState();

  const today = new Date();
  const month = today.getMonth();
  // console.log('ExpensesByMonth expenses ',totalsByCategoryAndMonth)

  const organizeTabContent = () => {
    months.map((m, i) => {
      return testTabs[i].panel = <MonthlyTotalsTable expenses={totalsByCategoryAndMonth[i]} />;
    });

    setTabContent(testTabs);
  }

  useEffect(() => {
    organizeTabContent();
    setCurrentMonth(month);
  // eslint-disable-next-line
  }, [currentMonth, totalsByCategoryAndMonth]); // react-hooks/exhaustive-deps


  return (
  <Box sx={{ width: '100%' }}>
    <Tabs currentTab={currentMonth} tabContent={tabContent} />
  </Box>
  );
} 

export default ExpensesByMonth;