import React, { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'

import { Box, Button } from '@mui/material';

import ExpensesByMonth from './components/ExpensesByMonth';
import ExpensesListByCategory from './components/ExpensesListByCategory';
// import ListedExpenses from './components/ListedExpenses';
import NewExpense from './components/NewExpense';
import Navigation from './components/Navigation';
import PageWrapper from './components/Navigation/PageWrapper';
import SummaryTotalsTable from './components/SummaryTotalsTable';
import YearlyTotalsTable from './components/YearlyTotalsTable';

import useExpenses from './useExpenses';

import './styles/App.css';

function App() {
  const { totalsByCategory, totalsByMonthAndCategory, getTotalsByMonthAndCategory, totalByMonthAndCategory } = useExpenses();
  const [showExpenseForm, setShowExpenseForm] = useState(true);
  const [testExpenses, setTestExpenses] = useState([])
  const [page, setPage] = useState(1);

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

  const hideShowExpenseForm = () => setShowExpenseForm(!showExpenseForm);

  useEffect(() => {
    // console.log('useEffect App')
    getTotalsByMonthAndCategory();
    // totalByMonthAndCategory();
  }, [])

  return (
    <div className="App">
      <Navigation handlePageChange={handlePageChange} page={page} />
      <PageWrapper value={page} index={0}>
        <SummaryTotalsTable />
      </PageWrapper>
      <PageWrapper value={page} index={1}>
        <ExpensesListByCategory />
      </PageWrapper>
    </div>
  );
}

export default App;


/* <div className="App">
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
</div> *//*} 
</div> */