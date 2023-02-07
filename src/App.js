import React, { useEffect, useState } from 'react';

import ExpensesListByCategory from './components/ExpensesListByCategory';
import Navigation from './components/navigation';
import PageWrapper from './components/navigation/PageWrapper';
import SummaryTotalsTable from './components/SummaryTotalsTable';
import Tracker from './components/Tracker';

import useExpenses from './state/useExpenses';
import useItems from './state/useItems';

import './styles/App.css';

function App() {
  const { getTotalsByCategoryAndMonth } = useExpenses();
  const { getOwedItems } = useItems();
  const [page, setPage] = useState(0);

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

  useEffect(() => {
    // console.log('useEffect App')
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
        <ExpensesListByCategory />
      </PageWrapper>
      <PageWrapper value={page} index={2}>
        <Tracker />
      </PageWrapper>
    </div>
  );
}

export default App;