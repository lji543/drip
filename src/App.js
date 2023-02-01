import React, { useEffect, useState } from 'react';

import ExpensesListByCategory from './components/ExpensesListByCategory';
import Navigation from './components/Navigation';
import PageWrapper from './components/Navigation/PageWrapper';
import SummaryTotalsTable from './components/SummaryTotalsTable';

import useExpenses from './useExpenses';

import './styles/App.css';

function App() {
  const { getTotalsByCategoryAndMonth } = useExpenses();
  const [page, setPage] = useState(1);

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

  useEffect(() => {
    // console.log('useEffect App')
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
    </div>
  );
}

export default App;