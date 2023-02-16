// TODO: separate different context's based on value types? - status, budget, tracking, etc
// or maybe split up useExpenses instead
import React, { useState } from 'react';

import { totalsByCategory, expensesByCategoryAndMonth, totalsByCategoryAndMonth } from '../utils/ericConstants';

const BudgetContext = React.createContext([{}, () => {}]);

const BudgetProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    email: null,
    // name: null,
  });
  const [mortgageDetails, setMortgageDetails] = useState({
    currentCashOnHand: 0,
    downPayment: 0,
    downPaymentPct: 0,
    estimatedClosingCosts: {
      percent: 0,
      total: 0,
    },
    housingMktGrowthRate: 0,
    interestRate: 0,
    loanPrincipal: 0,
    loanYears: 0,
    monthlyPayment: 0,
    pmtsPerYear: 0,
    presentDayHomeValue: 0,
  });
  const [owedItems, setOwedItems] = useState({
    owedByEric: [],
    owedToEric: [],
    owedByEricDisabled: [],
    owedToEricDisabled: [],
    totalOwedByEric: 0,
    totalOwedToEric: 0,
  });
  const [spending, setSpending] = useState({
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
  const [utility, setUtility] = useState({
    today: '',
  });
  return (
    <BudgetContext.Provider
      value={{
        authenticatedUserBudgetContext: [authenticatedUser, setAuthenticatedUser],
        mortgageDetailsBudgetContext: [mortgageDetails, setMortgageDetails],
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