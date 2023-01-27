import React, { useState } from 'react';

import { totalsByCategory, expensesByCategoryAndMonth, totalsByMonthAndCategory } from './utils/constants';

const BudgetContext = React.createContext([{}, () => {}]);

const BudgetProvider = (props) => {
  const [state, setState] = useState({
    totalsByCategory: totalsByCategory,
    expensesByCategoryAndMonth: expensesByCategoryAndMonth,
    totalsByMonthAndCategory: totalsByMonthAndCategory,
  });
  return (
    <BudgetContext.Provider value={[state, setState]}>
      {props.children}
    </BudgetContext.Provider>
  );
}

export { BudgetContext, BudgetProvider };