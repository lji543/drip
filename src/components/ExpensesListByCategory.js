// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import { Box } from '@mui/material';

import ListedExpenses from './ListedExpenses';
import Tabs from './utilComponents/Tabs';

import { categories, months, statusMessages } from '../utils/ericConstants';
import useExpenses from '../state/useExpenses';

const ExpenseList = ({category}) => { // Month tabs, with categories as parent
  // console.log('ExpenseList ', category)
  const { expensesByCategoryAndMonth, statusState, totalsByCategoryAndMonth } = useExpenses();
  const [tabContent, setTabContent] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const statusMessage = statusState.updateType ? statusMessages[statusState.updateType][statusState.result] : '';

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const snackBarAction = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
  // eslint-disable-next-line
  }, [totalsByCategoryAndMonth]); // react-hooks/exhaustive-deps

  useEffect(() => {
    setSnackbarOpen(statusState.updateType ? true : false);
  // eslint-disable-next-line
  }, [statusState]); // react-hooks/exhaustive-deps

  return ( 
    <div>
      <Tabs currentTab={0} tabContent={tabContent} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={statusMessage}
        action={snackBarAction}
      />
    </div>
  );
}

const ExpensesListByCategory = () => { // Category tabs, with months as child
  const { totalsByCategory, totalsByCategoryAndMonth } = useExpenses();
  const [tabContent, setTabContent] = useState([]);
  // console.log('Summary Totals Table totalsByCategory ',totalsByCategory)

  const organizeTabContent = () => {
    let tabContent = [];
    categories.forEach((cat, i) => {
      tabContent.push({
        label: `${totalsByCategory[cat].name}`,
        panel: <ExpenseList category={cat} />
      });
    });

    setTabContent(tabContent);
  }

  useEffect(() => {
    organizeTabContent();
  // eslint-disable-next-line
  }, [totalsByCategoryAndMonth]); // react-hooks/exhaustive-deps

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs currentTab={0} tabContent={tabContent} orientation='vertical' />
    </Box>
  );
}

export default ExpensesListByCategory;