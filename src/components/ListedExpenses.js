// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import { categories, months } from '../utils/ericConstants';
import useExpenses from '../useExpenses';
import { expenses } from '../utils/constants';

const ListedExpenses = ({expenses}) => {
  // console.log('ListedExpenses ', expenses)
  const { expensesByCategoryAndMonth, totalsByCategory, totalsByMonthAndCategory } = useExpenses();
  const [tabContent, setTabContent] = useState([]);
  // console.log('Summary Totals Table totalsByCategory ',totalsByCategory)
  // console.log('Summary Totals Table totalsByMonthAndCategory ',totalsByMonthAndCategory)
  // console.log('Summary Totals Table months ',months)
  // const totalVariance = expenses.monthBudget - expenses._monthTotal;

  const organizeTabContent = () => {
    categories.forEach((cat, i) => {

      // return testTabs[i].panel = <MonthlyTotalsTable expenses={totalsByMonthAndCategory[i]} />;
    });

    // setTabContent(testTabs);
  }

  useEffect(() => {
    organizeTabContent();
  }, [totalsByMonthAndCategory])

  return (
    <Box sx={{ width: '100%' }}>
      {expenses.map((exp, i) => {
        return (
          <div key={i}>
            <div>{exp.date}</div>
            <div>{exp.details}</div>
            <div>{exp.amount}</div>
          </div>
        )
      })}
    </Box>
  );
}

export default ListedExpenses;