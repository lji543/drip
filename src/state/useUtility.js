import { useContext } from 'react';
import { collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import { formatDate } from '../utils/utilFunctions';

const useUtility = () => {
  const { utilityBudgetContext } = useContext(BudgetContext);
  const [utility, setUtility] = utilityBudgetContext;

  function getDate() {
    let todaysDate = new Date();
    const todaysMonth = todaysDate.getMonth();
    todaysDate = formatDate(todaysDate);
    // let todayDate = '2/7/23';
    // console.log('getDate ', todayDate);
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