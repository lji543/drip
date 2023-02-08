import React, { useEffect, useState } from 'react';

import ExpensesListByMonth from './components/ExpensesListByMonth';
import ExpensesListByCategoryAndMonth from './components/ExpensesListByCategoryAndMonth';
import Navigation from './components/navigation';
import PageWrapper from './components/navigation/PageWrapper';
import SummaryTotalsTable from './components/SummaryTotalsTable';
import Tracker from './components/Tracker';

import useExpenses from './state/useExpenses';
import useItems from './state/useItems';
import useUtility from './state/useUtility';

import './styles/App.css';

function App() {
  const { getTotalsByCategoryAndMonth } = useExpenses();
  const { getDate } = useUtility();
  const { getOwedItems } = useItems();
  const [page, setPage] = useState(0);

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

  useEffect(() => {
    getDate(); // TODO: change this to something that runs all the basic util functions needed?
    getOwedItems();
    getTotalsByCategoryAndMonth();
  // eslint-disable-next-line
  }, []); // react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Navigation handlePageChange={handlePageChange} page={page} />
      <PageWrapper value={page} index={0}>
        <SummaryTotalsTable />
      </PageWrapper>
      <PageWrapper value={page} index={1}>
        <ExpensesListByMonth />
      </PageWrapper>
      <PageWrapper value={page} index={2}>
        <ExpensesListByCategoryAndMonth />
      </PageWrapper>
      <PageWrapper value={page} index={3}>
        <Tracker />
      </PageWrapper>
    </div>
  );
}

export default App;