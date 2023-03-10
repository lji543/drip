// TODO: separate different context's based on value types? - status, budget, tracking, etc
// or maybe split up useExpenses instead
import React, { useState } from 'react';

import { totalsByCategory, expensesByCategoryAndMonth, totalsByCategoryAndMonth, trackedExpenses } from '../utils/ericConstants';

const BudgetContext = React.createContext([{}, () => {}]);

const BudgetProvider = (props) => {
  const [owedItems, setOwedItems] = useState({
    // owedByEric: trackedExpenses.owedByEric,
    // owedToEric: trackedExpenses.owedToEric,
    // owedByEricDisabled: trackedExpenses.owedByEricDisabled,
    // owedToEricDisabled: trackedExpenses.owedToEricDisabled,
    // totalOwedByEric: trackedExpenses.totalOwedByEric,
    // totalOwedToEric: trackedExpenses.totalOwedToEric,
    owedByEric: [],
    owedToEric: [],
    owedByEricDisabled: [],
    owedToEricDisabled: [],
    totalOwedByEric: 0,
    totalOwedToEric: 0,
  });
  const [spending, setSpending] = useState({
    // totalsByCategory: totalsByCategory,
    // expensesByCategoryAndMonth: expensesByCategoryAndMonth,
    // totalsByCategoryAndMonth: totalsByCategoryAndMonth,
    totalsByCategory: {},
    expensesByCategoryAndMonth: [],
    totalsByCategoryAndMonth: {},
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
        // stateBudgetContext: [state, setState],
        owedItemsBudgetContext: [owedItems, setOwedItems],
        spendingBudgetContext: [spending, setSpending],
        statusBudgetContext: [status, setStatus]
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
}

export { BudgetContext, BudgetProvider };