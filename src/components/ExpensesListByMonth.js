// TODO: combine w/ by month and category expenselist/component
import React, { useEffect, useRef, useState } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';

//  import ListedExpenses from './secondaryComponents/ListedExpenses';
import ListedExpensesByCategory from './secondaryComponents/ListedExpensesByCategory';
import Tabs from './utilComponents/Tabs';

import { categories, months, monthsFull, statusMessages } from '../utils/ericConstants';
import { convertToString } from '../utils/utilFunctions';
import useExpenses from '../state/useExpenses';
import useUtility from '../state/useUtility';
 
const CategoryTablesList = ({ expenses, month }) => {
  const { totalsByCategoryAndMonth  } = useExpenses();
  // console.log('expenses ', expenses)
  return (
    <div>
      <div className='page-heading'>{`${monthsFull[month]} TOTAL: $ ${convertToString(totalsByCategoryAndMonth[month]._monthTotal)}`}</div>
      {categories.map((cat) => {
        if (!expenses[cat] || !expenses[cat].expenses) {
          expenses[cat] = {
            expenses: [],
          };
        }
        return <ListedExpensesByCategory key={cat} category={cat} expenses={expenses[cat].expenses} month={month} />;
      })}
    </div>
  );
}

const ExpensesListByMonth = () => {
   // console.log('ExpenseList ', category)
  //  const { expensesByCategoryAndMonth  } = useExpenses();
   const { currentMonth  } = useUtility();
   const expenseListRef = useRef(null);
  //  console.log('ExpensesListByMonth ',month, today)
   const { expensesByCategoryAndMonth, statusState, totalsByCategory, totalsByCategoryAndMonth } = useExpenses();
 
  // const [currentMonth, setCurrentMonth] = useState(0);
  const [smallScreen, setSmallScreen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tabContent, setTabContent] = useState([]);
 
   const screenWidth = expenseListRef.current?.clientWidth;
  //  const statusMessage = statusState.updateType ? 
  //    `${statusMessages[statusState.updateType][statusState.result]} ${totalsByCategory[category].name}` : '';
 
  const handleMonthChange = () => {

  }

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  // TODO: move this?
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
    let organizedTabContent = [];
    months.forEach((mo, i) => {
      // let listedExpenses = [];
      const listedExpenses = expensesByCategoryAndMonth[i];
      // console.log('listedExpenses ',listedExpenses)
      // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth)

      //  if (expensesByCategoryAndMonth[i]) {
      //    listedExpenses = expensesByCategoryAndMonth[i] = [];
      //  };

      organizedTabContent.push({
        label: mo,
        panel: <CategoryTablesList expenses={listedExpenses} month={i} />,
       });
    });
    // console.log(organizedTabContent)
    setTabContent(organizedTabContent);
  }

  useEffect(() => {
    organizeTabContent();
  // eslint-disable-next-line
  }, [expensesByCategoryAndMonth, expensesByCategoryAndMonth[0]]); // react-hooks/exhaustive-deps

  useEffect(() => {
    //  setSnackbarOpen(statusState.updateType ? true : false);
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
      {smallScreen &&
        <div className='small-screen'>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            size="small"
          >
            <InputLabel id="demo-select-small">Month</InputLabel>
            <Select  sx={{ m: 1, minWidth: 120 }}
              id="month-select"
              value={currentMonth}
              onChange={handleMonthChange}
            >
              {months.map((month) => <MenuItem key={month} value={month}>{month}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      }
      <Tabs currentTab={currentMonth} tabContent={tabContent} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        //  message={statusMessage}
        action={snackBarAction}
      />
    </div>
  );
}
  
export default ExpensesListByMonth;