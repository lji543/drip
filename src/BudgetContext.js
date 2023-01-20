import React, { useState } from 'react';

import { expensesByCategory, expensesByMonth, expensesByMonthAndCategory } from './utils/constants';

const BudgetContext = React.createContext([{}, () => {}]);

const BudgetProvider = (props) => {
  const [state, setState] = useState({
    expensesByCategory: expensesByCategory,
    expensesByMonth: expensesByMonth,
    expensesByMonthAndCategory: expensesByMonthAndCategory,
  });
  return (
    <BudgetContext.Provider value={[state, setState]}>
      {props.children}
    </BudgetContext.Provider>
  );
}

export { BudgetContext, BudgetProvider };

// addNewExpense,
// allExpenses: state.allExpenses,
// expensesByMonth: state.expensesByMonth,
// expensesByCategory: state.expensesByCategory,
// totalByCategory,
// totalByMonth,