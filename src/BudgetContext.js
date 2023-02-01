import React, { useState } from 'react';

// import { totalsByCategory, expensesByCategoryAndMonth, totalsByCategoryAndMonth } from './utils/constants';
import { totalsByCategory, expensesByCategoryAndMonth, totalsByCategoryAndMonth } from './utils/ericConstants';

const BudgetContext = React.createContext([{}, () => {}]);

const BudgetProvider = (props) => {
  const [state, setState] = useState({
    totalsByCategory: totalsByCategory,
    expensesByCategoryAndMonth: expensesByCategoryAndMonth,
    totalsByCategoryAndMonth: totalsByCategoryAndMonth,
    id: null,
    timestamp: null,
  });
  const [status, setStatus] = useState({
    updateType: null,
    result: null,
  });
  return (
    <BudgetContext.Provider
      value={{
        stateBudgetContext: [state, setState],
        statusBudgetContext: [status, setStatus]
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
}

export { BudgetContext, BudgetProvider };