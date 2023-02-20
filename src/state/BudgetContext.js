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
  const [mortgageDetails, setMortgageDetails] = useState({
    additionalPaid: [], // TODO:
    loanBalancesByPeriod: [], // TODO:
    currentAffordableHomeValue: 0,
    currentCashNeeded: 0,
    currentCashOnHand: 0,
    downPayment: 70000,
    downPaymentPct: 20,
    estimatedClosingCostsTotal: 17500,
    estimatedClosingCostsPct: 5,
    housingMktGrowthRate: 4,
    interestRate: 7,
    loanPrincipal: 280000,
    loanYears: 30,
    monthlyPayment: 1863,
    pmtsPerYear: 12,
    presentDayHomeValue: 350000,
    targetDownPayment: 0,
    targetDownPaymentPct: 0,
    targetHomeValue: 0,
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