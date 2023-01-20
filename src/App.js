import React, { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'

import { Box, Button } from '@mui/material';

import ExpensesByMonth from './components/ExpensesByMonth';
import NewExpense from './components/NewExpense';
import YearlyTotalsTable from './components/YearlyTotalsTable';

import useExpenses from './useExpenses';

import './styles/App.css';

function App() {
  const { totalsByCategory, totalsByMonthAndCategory, getTotalsByMonthAndCategory, totalByMonthAndCategory } = useExpenses();
  const [showExpenseForm, setShowExpenseForm] = useState(true);
  const [testExpenses, setTestExpenses] = useState([])

  const hideShowExpenseForm = () => setShowExpenseForm(!showExpenseForm);

  useEffect(() => {
    getTotalsByMonthAndCategory();
    // totalByMonthAndCategory();
  }, [])

  return (
    <div className="App">
      <ExpensesByMonth />
      <YearlyTotalsTable />
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
