import { useContext } from 'react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'

import useAuth from './useAuth';
import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import {
  categories,
  expensesByCategoryAndMonth as expensesByCategoryAndMonthBase,
  months,
  yearTotalsByCategory as yearTotalsByCategoryBase,
  totalsByCategoryAndMonth as totalsByCategoryAndMonthBase
} from '../utils/ericConstants';
import { getDaysInMonth, roundNumberToTwo } from '../utils/utilFunctions';

const useExpenses = () => {
  const { spendingBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  const { authenticatedUser } = useAuth();
  // const expensesDocRef = doc(db, authenticatedUser.uid, "expenses");
  // console.log('useExpenses ', authenticatedUser)
  // const expensesCollectionRef = collection(db, 'expenses');
  
  // const userDocRef = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', "mortgage");
  const [spending, setSpending] = spendingBudgetContext;
  const [status, setStatus] = statusBudgetContext;

  function addNewExpense(newExpense, category) { // TODO: combine with update fn
    // TODO: add catch to that duplicate expenses cannot be added
    // i.e. look for matching id's
    const { expensesByCategoryAndMonth } = spending;
    let expenseList = [];

    // console.log('newExpense ', getDaysInMonth(2023, 2, 0));
    const dateArray = newExpense.date.split("/");  // TODO: workaround weird mui bug
    const month = dateArray[0] - 1;
    const num = parseInt(dateArray[1]) + 1;
    const numString = num.toLocaleString('en-US');
    const newDate = `${dateArray[0]}/${numString}/${dateArray[2]}`

    // console.log('addNewExpense ', newExpense, category);
    // console.log('expensesByCategoryAndMonth ', expensesByCategoryAndMonth);
    // console.log('month ', month);
    if (!expensesByCategoryAndMonth[month]) { // mainly for new users/users with no data
      months.forEach((mo) => {
        if (!expensesByCategoryAndMonth[mo]) {
          expensesByCategoryAndMonth.push(expensesByCategoryAndMonthBase[mo]);
        }
      });
    }
    // console.log('expensesByCategoryAndMonth ', expensesByCategoryAndMonth);
    if (!expensesByCategoryAndMonth[month][category]) { // mainly for new users/users with no data
      expensesByCategoryAndMonth[month][category] = { expenses: [] };
      // expenseList = [...expensesByCategoryAndMonth[month][category].expenses];
    }

    
    if (newExpense.isMonthly || newExpense.isYearly) {
      expenseList = handleIsRecurring(category, dateArray, month, newExpense, expensesByCategoryAndMonth);
      // console.log('recurring monthly ',expenseList)
      totalByCategoryAndMonth(expenseList, 'add');
    } else {
      expenseList = [...expensesByCategoryAndMonth[month][category].expenses];
      const updatedNewExpense = { // TODO: workaround
        ...newExpense,
        date: newDate,
      }
      // expenseList.push(newExpense);
      expenseList.push(updatedNewExpense);
      expensesByCategoryAndMonth[month][category].expenses = expenseList; // array of a just the edited category, for the specified month
      
      // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth[month][category])
      totalByCategoryAndMonth(expensesByCategoryAndMonth, 'add');
    }
  }

  function deleteExpense(deletedExpense, category) { // combine these owed and expense functions
    const { expensesByCategoryAndMonth } = spending;
    const date = new Date(deletedExpense.date);
    const month = date.getMonth();
    let expenseList = [];

    expensesByCategoryAndMonth[month][category].expenses.forEach((currExp) => {
      if (currExp.id !== deletedExpense.id) {
        expenseList.push(currExp);
      }
    });

    expensesByCategoryAndMonth[month][category].expenses = expenseList;
    // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth)
    totalByCategoryAndMonth(expensesByCategoryAndMonth, 'delete');
  }

  function handleIsRecurring(category, dateArray, month, newExpense, byCatAndMonth) { // passing in array of a just the edited category, for the specified month
    let newByCatAndMonth = [...byCatAndMonth];

    if (newExpense.isMonthly) {
      months.forEach((mo, idx) => {
        const daysInMonth = getDaysInMonth(dateArray[2], idx + 1);
        const day = dateArray[2] > daysInMonth ? daysInMonth : dateArray[1];

        let recurringList = [...newByCatAndMonth[idx][category].expenses];
        let recurringExp = {
          ...newExpense,
          date: idx === month ? newExpense.date : `${idx+1}/${day}/${dateArray[2]}`,
        }
        recurringList.push(recurringExp);
        newByCatAndMonth[idx][category].expenses = recurringList;
      });
    } 
    // TODO: add functionality for expenses occurring yearly

    return newByCatAndMonth;
  }

  function updateExpense(updatedExpense, category) {
    const { expensesByCategoryAndMonth } = spending;
    const date = new Date(updatedExpense.date);
    const month = date.getMonth();
    // let isAmountSame = false;
    // let isDateSame = false;
    // let isCatSame = false;

    let expenseList = expensesByCategoryAndMonth[month][category].expenses.map((currExp) => {
      if (currExp.id === updatedExpense.id) {
        // isAmountSame = currExp.amount === updatedExpense.amount;
        // isDateSame = currExp.date === updatedExpense.date;
        // isCatSame = currExp.category === updatedExpense.category;
        currExp = updatedExpense;
      }
      return currExp;
    });

    expensesByCategoryAndMonth[month][category].expenses = expenseList;
    // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth)
    totalByCategoryAndMonth(expensesByCategoryAndMonth, 'update');
  }

  function totalByCategoryAndMonth(newMonthCategoryArray, updateType) {
    const { expensesByCategoryAndMonth, yearTotalsByCategory, totalsByCategoryAndMonth } = spending;
    const expenseList = totalsByCategoryAndMonth;
    const newExpensesByCategoryAndMonth = newMonthCategoryArray || expensesByCategoryAndMonth;
    // console.log('newExpensesByCategoryAndMonth ',newExpensesByCategoryAndMonth)
  
    let yearTotal = 0;
  
    newExpensesByCategoryAndMonth.map((monthExpenses, month) => {
      let monthTotal = 0;
      
      categories.map((cat) => {
        let catTotalForMonth = 0;
  
        if (monthExpenses[cat]) {
          monthExpenses[cat].expenses.map((expense) => {
            return catTotalForMonth += expense.amount;
          });
        } else {
          catTotalForMonth = 0;
        }
         return (
           expenseList[month][cat] = roundNumberToTwo(catTotalForMonth),
           monthTotal += catTotalForMonth
         );
      });
  
      return (
        expenseList[month]._monthTotal = roundNumberToTwo(monthTotal),
        yearTotal =+ monthTotal
      );
    });
  
    yearTotalsByCategory._yearTotal = roundNumberToTwo(yearTotal);
  
    categories.map(cat => {
      let catYearTotal = 0;
      [0,1,2,3,4,5,6,7,8,9,10,11].map(month => {
        return catYearTotal += expenseList[month][cat];
      })
       return (
         yearTotalsByCategory[cat].total = roundNumberToTwo(catYearTotal),
         yearTotalsByCategory[cat].monthlyAvg = roundNumberToTwo(catYearTotal / 12)
       );
    });
  
    const newSpendingState = {
      ...spending,
      expensesByCategoryAndMonth: newExpensesByCategoryAndMonth,
      totalsByCategoryAndMonth: expenseList,
      yearTotalsByCategory: yearTotalsByCategory
    }
    console.log('newSpendingState ',newSpendingState)
    setSpending(newSpendingState);
    
    // if (newMonthCategoryArray && updateType) { // TODO: is this separation necessary? separate functions, state updates and db calls?
    //   updateExpensesInDatabase(newSpendingState, updateType)
    //     .then(() => {
    //       setTimeout(() => setStatus({
    //         updateType: null,
    //         result: null,
    //       }), 6000);
    //     });
    // }
  }

  async function getTotalsByCategoryAndMonth() {
    const expensesDocRef = doc(db, authenticatedUser.uid, "expenses");

    await getDoc(expensesDocRef).then((expenses) => {
      const expensesData = expenses.data();

      // console.log('***Firebase Expenses ', expensesData);
      // TODO: will have to figure out how to load temp data for new users - or maybe just auto-update with constant data if an empty data obj is returned
      // const expByCatMo = expensesData.expensesByCategoryAndMonth ? expensesData.expensesByCategoryAndMonth : expensesByCategoryAndMonthBase;
      // const totalsByCat = expensesData.yearTotalsByCategory ? expensesData.yearTotalsByCategory : yearTotalsByCategoryBase;
      // const totalsByCatMo = expensesData.totalsByCategoryAndMonth ? expensesData.totalsByCategoryAndMonth : totalsByCategoryAndMonthBase;

      // console.log(yearTotalsByCategory)
        setSpending(state => (
          { 
            ...state,
            // expensesByCategoryAndMonth: expByCatMo,
            // yearTotalsByCategory: totalsByCat,
            // totalsByCategoryAndMonth: totalsByCatMo,
            // expensesByCategoryAndMonth: expensesData.expensesByCategoryAndMonth || [],
            // yearTotalsByCategory: expensesData.yearTotalsByCategory || {},
            // totalsByCategoryAndMonth: expensesData.totalsByCategoryAndMonth || {},
            expensesByCategoryAndMonth: expensesData.expensesByCategoryAndMonth || expensesByCategoryAndMonthBase,
            yearTotalsByCategory: expensesData.yearTotalsByCategory || yearTotalsByCategoryBase,
            totalsByCategoryAndMonth: expensesData.totalsByCategoryAndMonth || totalsByCategoryAndMonthBase,
            // expensesByCategoryAndMonth: expensesData.expensesByCategoryAndMonth,
            // yearTotalsByCategory: expensesData.yearTotalsByCategory,
            // totalsByCategoryAndMonth: expensesData.totalsByCategoryAndMonth,
            // id: expensesData.id,
          }
        ));
      // }

    }).catch((err) => {
      console.log(err);
    })
  }

  const updateExpensesInDatabase = async (newSpendingState, updateType) => {
    // console.log('newSpendingState ',newSpendingState)
    try {
      const expensesDocRef = doc(db, authenticatedUser.uid, "expenses");
      // console.log('doc update with: ',newSpendingState.expensesByCategoryAndMonth[1]);
      // const expensesDocRef = doc(db, authenticatedUser.uid, "expenses");
      // console.log(authenticatedUser.uid)
      // console.log(expensesDocRef)
      await updateDoc(expensesDocRef, {
        ...newSpendingState,
        timestamp: serverTimestamp(),
      });
      setStatus({ updateType, result: 'success' });
    } catch (err) {
      setStatus({ updateType, result: 'error'});
      console.log(err);
    }
  }

  const _adjustDatabaseExpenses = async (newSpendingState, updateType) => {
    try {
      // console.log('doc update with: ',newSpendingState.expensesByCategoryAndMonth[1]);
      const expenses = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', 'expenses');
      // console.log('expenses update: ',spending);
      console.log('expenses update: ',expenses);
      await updateDoc(expenses, {
        ...spending,
        timestamp: serverTimestamp(),
      });
      setStatus({ updateType, result: 'success' });
    } catch (err) {
      setStatus({ updateType, result: 'error'});
      console.log(err);
    }
  }

  return {
    addNewExpense,
    deleteExpense,
    expensesByCategoryAndMonth: spending.expensesByCategoryAndMonth,
    getTotalsByCategoryAndMonth,
    id: spending.id,
    statusState: status,
    yearTotalsByCategory: spending.yearTotalsByCategory,
    totalsByCategoryAndMonth: spending.totalsByCategoryAndMonth,
    totalByCategoryAndMonth,
    updateExpense,
  }
};

export default useExpenses;