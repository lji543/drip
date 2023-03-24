// TODO: combine w/ by month and category expenselist/component
import React, { useEffect, useRef, useState } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';

//  import ListedExpenses from './secondaryComponents/ListedExpenses';
import ListedExpenses from './secondaryComponents/ListedExpenses';
import Tabs from './utilComponents/Tabs';

import { categories, months, monthsFull, statusMessages } from '../utils/ericConstants';
import { convertToString } from '../utils/utilFunctions';
import useExpenses from '../state/useExpenses';
import useUtility from '../state/useUtility';

const ExpensesListTallyByMonth = () => {
   // console.log('ExpensesListTallyByMonth ', category)
  //  const { expensesByCategoryAndMonth  } = useExpenses();
   const { currentMonth  } = useUtility();
  //  console.log('ExpensesListTallyByMonth ',currentMonth)
   const { expensesByCategoryAndMonth, statusState, yearTotalsByCategory, totalsByCategoryAndMonth } = useExpenses();
 
  // const [currentMonth, setCurrentMonth] = useState(0);
  const [allMonthExpenses, setAllMonthExpenses] = useState([]);
  const [monthShown, setMonthShown] = useState(currentMonth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
 
  const handleMonthChange = (e) => {
    // console.log('handleMonthChange ', e.target.value)
    setMonthShown(e.target.value);
    // organizeListContent();
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

  const organizeListContent = () => {
    const monthByCat = expensesByCategoryAndMonth[monthShown];
    // console.log('organizeListContent ',monthShown)
    let monthExpenses = [];
    // console.log('expensesByCategoryAndMonth ',monthByCat)

    categories.forEach((cat) => {
      if (!monthByCat[cat]) return;
      return monthByCat[cat].expenses.map((expense) => monthExpenses.push(expense));
    });
    // let organizedTabContent = [];
    // months.forEach((mo, i) => {
    //   // let listedExpenses = [];
    //   const listedExpenses = expensesByCategoryAndMonth[i];
    //   // console.log('listedExpenses ',listedExpenses)
    //   // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth)

    //   //  if (expensesByCategoryAndMonth[i]) {
    //   //    listedExpenses = expensesByCategoryAndMonth[i] = [];
    //   //  };

    //   organizedTabContent.push({
    //     label: mo,
    //     panel: <CategoryTablesList expenses={listedExpenses} month={i} />,
    //    });
    // });
    // // console.log(organizedTabContent)
    // setTabContent(organizedTabContent);
    // console.log('monthExpenses ',monthExpenses)
    setAllMonthExpenses(monthExpenses);
  }

  useEffect(() => {
    organizeListContent();
  // eslint-disable-next-line
  }, [expensesByCategoryAndMonth, expensesByCategoryAndMonth[0]], monthShown); // react-hooks/exhaustive-deps

  useEffect(() => {
    organizeListContent();
  // eslint-disable-next-line
  }, [monthShown]); // react-hooks/exhaustive-deps

  return ( 
    <div className='page-wrapper'>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
      >
        {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
        <Select  sx={{ m: 1, minWidth: 120 }}
          id="category-select"
          value={monthShown}
          // label="Category"
          onChange={handleMonthChange}
        >
          {months.map((month, idx) => <MenuItem key={month} value={idx - 1}>{months[idx-1]}</MenuItem>)}
        </Select>
      </FormControl>
      <ListedExpenses expenses={allMonthExpenses} month={monthShown}/>
    </div>
  );
}
  
export default ExpensesListTallyByMonth;