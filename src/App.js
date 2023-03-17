import React, { useEffect, useState } from 'react';

import { Container, LinearProgress } from '@mui/material';

import dinoLogoFull from './styles/assets/dinoLogoFull.png';
import ExpensesListByMonth from './components/ExpensesListByMonth';
import ExpensesListByCategoryAndMonth from './components/ExpensesListByCategoryAndMonth';
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Navigation from './components/navigation';
import PageWrapper from './components/navigation/PageWrapper';
import SummaryTotalsTable from './components/SummaryTotalsTable';
import OwedTracker from './components/OwedTracker';
import MortgageCalculator from './components/premium/MortgageCalculator';

import useAuth from './state/useAuth';
import useExpenses from './state/useExpenses';
import useItems from './state/useItems';
import useUtility from './state/useUtility';

import './styles/App.css';

function App() {
  const { authenticatedUser, getAuthenticatedUser, updateUser } = useAuth();
  const { checkedLogin } = authenticatedUser;
  const { getTotalsByCategoryAndMonth } = useExpenses();
  const { getDate } = useUtility();
  const { getOwedItems } = useItems();

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

  useEffect(() => {
    // console.log('App - checking for user ',authenticatedUser)
    getAuthenticatedUser();
    if (authenticatedUser.checkedLogin) {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [checkedLogin]); // react-hooks/exhaustive-deps

  useEffect(() => {
    if (authenticatedUser.email) {
      // updateUser();
      getDate(); // TODO: change this to something that runs all the basic util functions needed?
      getOwedItems();
      getTotalsByCategoryAndMonth();
    }
  // eslint-disable-next-line
  }, [authenticatedUser]); // react-hooks/exhaustive-deps

  return (
    <div className="App">
      {isLoading ? (
        <div className='linear-progress'>
          <Container maxWidth='xs' className='bottom-margin-48'>
            <img
              className='image border-radius-8'
              src={dinoLogoFull}
              alt={'Drip'}
              loading="lazy"
            />
          </Container>
          <div
            className='color-title-text text-size-18 bottom-padding-12'
          >
            ... Please hold while your data loads. And get excited!
          </div>
          <LinearProgress color="success" />
        </div>
      ) : (
        <div>
          {authenticatedUser.email ? (
            <div>
              <Navigation handlePageChange={handlePageChange} page={page} />
              <PageWrapper value={page} index={0}>
                {authenticatedUser.name && <div className='dataGrid-tableHeader-title'>{`Hi ${authenticatedUser.name}`}</div>}
                <SummaryTotalsTable />
              </PageWrapper>
              <PageWrapper value={page} index={1}>
                <ExpensesListByMonth />
              </PageWrapper>
              <PageWrapper value={page} index={2}>
                <ExpensesListByCategoryAndMonth />
              </PageWrapper>
              <PageWrapper value={page} index={3}>
                <OwedTracker />
              </PageWrapper>
              <PageWrapper value={page} index={4}>
                <Logout />
              </PageWrapper>
            </div>
          ) : (
            <Login />
          )}
        </div>
      )}
    </div>
  );
}

export default App;