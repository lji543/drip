import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import ExpensesByMonth from './components/ExpensesByMonth';
import NewExpense from './components/NewExpense';
import YearlyTotalsTable from './components/YearlyTotalsTable';

import useExpenses from './useExpenses';

import './styles/App.css';

function App() {
  const { expensesByCategory, expensesByMonth, expensesByMonthAndCategory, totalByCategory, totalByMonth, totalByMonthAndCategory } = useExpenses();
  const [showExpenseForm, setShowExpenseForm] = useState(true);
  const [testExpenses, setTestExpenses] = useState([])

  const hideShowExpenseForm = () => setShowExpenseForm(!showExpenseForm);
  // console.log('App showExpenseForm ',showExpenseForm)
  // console.log('App testExpenses ',testExpenses)

  useEffect(() => {
    // TODO: won't need to do this here once we are hooked up to the server
    // totals will only need to be recalculated when new expenses are added
    // totalByCategory();
    // totalByMonth();
    totalByMonthAndCategory();
  }, [])

  return (
    <div className="App">
      <ExpensesByMonth />
      <YearlyTotalsTable expenses={expensesByCategory} />
      <Button onClick={hideShowExpenseForm}>
        {showExpenseForm ? 'Cancel' : 'Add new Expense'}
      </Button>
      {showExpenseForm && 
        <NewExpense testExpenses={testExpenses} hideShowExpenseForm={hideShowExpenseForm} showExpenseForm={showExpenseForm} />
      }
      {/* <div>TEST:</div>
      <div>
        {testExpenses.length > 0 &&
          testExpenses.map(exp => {
            return (
              <div>{exp.description} {exp.amount}</div>
            )
          })
        }
      </div> */}
    </div>
  );
}

export default App;
