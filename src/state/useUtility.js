import { useContext } from 'react';

import { BudgetContext } from "./BudgetContext";
import { formatDate } from '../utils/utilFunctions';

const useUtility = () => {
  const { utilityBudgetContext } = useContext(BudgetContext);
  const [utility, setUtility] = utilityBudgetContext;

  function getDate() {
    let todaysDate = new Date();
    const todaysMonth = todaysDate.getMonth();
    todaysDate = formatDate(todaysDate);
    setUtility({
      ...utility,
      month: todaysMonth,
      today: todaysDate,
    })
  }

  return {
    getDate,
    currentMonth: utility.month,
    today: utility.today,
    utility: utility,
  }
};

export default useUtility;