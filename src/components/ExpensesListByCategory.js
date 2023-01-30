// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import Tabs from './utilComponents/Tabs';
import ListedExpenses from './ListedExpenses';

import { categories, months } from '../utils/ericConstants';
import useExpenses from '../useExpenses';

const ExpenseList = ({category}) => {
  // console.log('ExpenseList ', category)
  const { expensesByCategoryAndMonth, totalsByCategory, totalsByMonthAndCategory } = useExpenses();
  const [tabContent, setTabContent] = useState([]);

  const organizeTabContent = () => {
    let tabContent = [];
    months.forEach((mo, i) => {
      let listedExpenses = [];

      if (expensesByCategoryAndMonth[i]?.[category]?.expenses) {
        listedExpenses = expensesByCategoryAndMonth[i][category].expenses;
      };

      tabContent.push({
        label: mo,
        panel: <ListedExpenses category={category} expenses={listedExpenses} month={i} />,
      });
    });

    setTabContent(tabContent);
  }

  useEffect(() => {
    organizeTabContent();
  }, [totalsByMonthAndCategory]);

  return (
    <Tabs currentTab={0} tabContent={tabContent} />
  );
}

const ExpensesListByCategory = () => {
  const { expensesByCategoryAndMonth, totalsByCategory, totalsByMonthAndCategory } = useExpenses();
  const [tabContent, setTabContent] = useState([]);
  // console.log('Summary Totals Table totalsByCategory ',totalsByCategory)
  // console.log('Summary Totals Table totalsByMonthAndCategory ',totalsByMonthAndCategory)
  // console.log('Summary Totals Table months ',months)
  // const totalVariance = expenses.monthBudget - expenses._monthTotal;

  const organizeTabContent = () => {
    let tabContent = [];
    categories.forEach((cat, i) => {
      tabContent.push({
        label: `${totalsByCategory[cat].name}`,
        panel: <ExpenseList category={cat} />
      });
      // let monthExp = expensesByCategoryAndMonth[i];
      // categories.forEach((cat) => {
      //   // monthExp[cat]
      // })
      // return testTabs[i].panel = <MonthlyTotalsTable expenses={totalsByMonthAndCategory[i]} />;
    });

    setTabContent(tabContent);
  }

  useEffect(() => {
    organizeTabContent();
  }, [totalsByMonthAndCategory])

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs currentTab={0} tabContent={tabContent} orientation='vertical' />
    </Box>
  );
}

export default ExpensesListByCategory;