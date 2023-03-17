// TODO: separate different context's based on value types? - status, budget, tracking, etc
// or maybe split up useExpenses instead
import React, { useState } from 'react';

import { yearTotalsByCategory, expensesByCategoryAndMonth, totalsByCategoryAndMonth, trackedExpenses } from '../utils/ericConstants';

const BudgetContext = React.createContext([{}, () => {}]);

const BudgetProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    email: null,
    name: null,
    uid: null,
  });
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
    yearTotalsByCategory: yearTotalsByCategory,
    expensesByCategoryAndMonth: expensesByCategoryAndMonth,
    totalsByCategoryAndMonth: totalsByCategoryAndMonth,
    // yearTotalsByCategory: {},
    // expensesByCategoryAndMonth: [],
    // totalsByCategoryAndMonth: {},
    id: null,
    timestamp: null,
  });
  const [status, setStatus] = useState({
    updateType: null,
    result: null,
  });
  const [utility, setUtility] = useState({
    today: '',
  });
  return (
    <BudgetContext.Provider
      value={{
        // stateBudgetContext: [state, setState],
        authenticatedUserBudgetContext: [authenticatedUser, setAuthenticatedUser],
        owedItemsBudgetContext: [owedItems, setOwedItems],
        spendingBudgetContext: [spending, setSpending],
        statusBudgetContext: [status, setStatus],
        utilityBudgetContext: [utility, setUtility],
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
}

export { BudgetContext, BudgetProvider };