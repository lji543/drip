// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useRef, useState } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { FormControl, IconButton, MenuItem, Select, Snackbar } from '@mui/material';

import ListedExpenses from './secondaryComponents/ListedExpenses';
import Tabs from './utilComponents/Tabs';

import { categories, months, statusMessages } from '../utils/ericConstants';
import useExpenses from '../state/useExpenses';
import useUtility from '../state/useUtility';

 ///// Month tabs, with categories as parent /////
 ///// Child of ExpenseListByCategory /////
 ///// TabContent/Children of ExpenseList is ListedExpenses /////
const ExpenseList = ({ category, handleCategoryChange }) => {
  // console.log('ExpenseList ', category)
  const expenseListRef = useRef(null);
  const { expensesByCategoryAndMonth, statusState, totalsByCategory, totalsByCategoryAndMonth } = useExpenses();
  const { currentMonth } = useUtility();

  const [tabContent, setTabContent] = useState([]);
  const [smallScreen, setSmallScreen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const screenWidth = expenseListRef.current?.clientWidth;
  const statusMessage = statusState.updateType ? 
    `${statusMessages[statusState.updateType][statusState.result]} ${totalsByCategory[category].name}` : '';

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

  useEffect(() => {
    // console.log('clientWidth ',expenseListRef.current?.clientWidth)
    // 534px is the @media cutoff for small screens in css (= 518 for clientWidth)
    const ss = // TODO: make this dynamic in case of resizing the screen (onwindowresize or something)
      expenseListRef.current?.clientWidth <= 518 ? true : false;

      setSmallScreen(ss);
  // eslint-disable-next-line
  }, [screenWidth]); // react-hooks/exhaustive-deps

  return ( 
    <div ref={expenseListRef}>
      {/* <div className={smallScreen ? 'small-screen' : 'large-screen'} > */}
      {smallScreen &&
        <div className='small-screen'>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            size="small"
          >
            {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
            <Select  sx={{ m: 1, minWidth: 120 }}
              id="category-select"
              value={category}
              // label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => <MenuItem key={cat} value={cat}>{totalsByCategory[cat].name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      }
      <Tabs currentTab={currentMonth} tabContent={tabContent} />
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


///// Vertical, Category Tabs - with ExpenseList Component as tabPanel /////
///// The ExpenseList Component contains months as tabs /////
const ExpensesListByCategoryAndMonth = () => { // Category tabs, with months as child
  const { totalsByCategory, totalsByCategoryAndMonth } = useExpenses();

  const [displayedCategory, setDisplayedCategory] = useState(0);
  const [tabContent, setTabContent] = useState([]);
  // console.log('Summary Totals Table totalsByCategory ',totalsByCategory)

  const handleCategoryChange = (e) => {
    const cat = categories.indexOf(e.target.value);

    setDisplayedCategory(cat);
  }

  const organizeTabContent = () => {
    let organizedTabContent = [];
    // console.log('organizeTabContent ',organizedTabContent)
    // console.log('organizeTabContent ',categories)
    // console.log('organizeTabContent ',totalsByCategory)
    categories.forEach((cat, i) => {
      organizedTabContent.push({
        label: `${totalsByCategory[cat].name}`,
        panel: <ExpenseList category={cat} handleCategoryChange={handleCategoryChange} />
      });
    });

    setTabContent(organizedTabContent);
  }

  useEffect(() => {
    organizeTabContent();
  // eslint-disable-next-line
  }, [displayedCategory, totalsByCategoryAndMonth]); // react-hooks/exhaustive-deps

  return (
    <Tabs currentTab={displayedCategory} tabContent={tabContent} orientation='vertical' />
  );
}

export default ExpensesListByCategoryAndMonth;