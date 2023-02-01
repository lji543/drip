import { useContext } from 'react';
import { collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import { db } from './utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import { categories } from './utils/ericConstants';
import { roundNumberToTwo } from './utils/utilFunctions';

const useExpenses = () => {
  const { stateBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  const collectionRef = collection(db, 'expenses');
  const [state, setState] = stateBudgetContext;
  const [status, setStatus] = statusBudgetContext;

  function addNewExpense(newExpense, category) { // TODO: combine with update fn
    const { expensesByCategoryAndMonth } = state;
    const date = new Date(newExpense.date);
    const month = date.getMonth();

    let expenseList = [...expensesByCategoryAndMonth[month][category].expenses];
    // console.log('addNewExpense ', newExpense, category);

    expenseList.push(newExpense);

    expensesByCategoryAndMonth[month][category].expenses = expenseList;
    console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth[month][category])
    totalByCategoryAndMonth(expensesByCategoryAndMonth, 'add');
  }

  function deleteExpense(deletedExpense, category) {
    const { expensesByCategoryAndMonth } = state;
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

  function updateExpense(updatedExpense, category) {
    const { expensesByCategoryAndMonth } = state;
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
    const { expensesByCategoryAndMonth, totalsByCategory, totalsByCategoryAndMonth } = state;
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

    totalsByCategory._yearTotal = roundNumberToTwo(yearTotal);

    categories.map(cat => {
      let catYearTotal = 0;
      [0,1,2,3,4,5,6,7,8,9,10,11].map(month => {
        return catYearTotal += expenseList[month][cat];
      })
       return (
         totalsByCategory[cat].total = roundNumberToTwo(catYearTotal),
         totalsByCategory[cat].monthlyAvg = roundNumberToTwo(catYearTotal / 12)
       );
    });

    const newState = {
      ...state,
      expensesByCategoryAndMonth: newExpensesByCategoryAndMonth,
      totalsByCategoryAndMonth: expenseList,
      totalsByCategory: totalsByCategory
    }
    
    setState(newState);
    if (newMonthCategoryArray && updateType) { // TODO: is this separation necessary? separate functions, state updates and db calls?
      updateExpensesInDatabase(newState, updateType)
        .then(() => {
          setTimeout(() => setStatus({
            updateType: null,
            result: null,
          }), 6000);
        });
    }
  }

  async function getTotalsByCategoryAndMonth() {
    await getDocs(collectionRef).then((expenses) => {
      const expensesData = expenses.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // console.log('Firebase Expenses ', expensesData[0])

      // if (!expensesData[0]) { // TODO: add some sort of error handling
      //   expensesData = {
      //     totalsByCategory: totalsByCategory,
      //     totalsByCategoryAndMonth: totalsByCategoryAndMonth,
      //   }
      // } else {
      //   console.log('getTotalsByCategoryAndMonth - not setting ', expensesData[0])
        setState(state => (
          { 
            ...state,
            expensesByCategoryAndMonth: expensesData[0].expensesByCategoryAndMonth,
            totalsByCategory: expensesData[0].totalsByCategory, // TODO: update this call so we don't have to ref an array index
            totalsByCategoryAndMonth: expensesData[0].totalsByCategoryAndMonth,
            id: expensesData[0].id,
          }
        ));
      // }

    }).catch((err) => {
      console.log(err);
    })
  }

  const updateExpensesInDatabase = async (newState, updateType) => {
    try {
      // console.log('doc update with: ',newState.expensesByCategoryAndMonth[0].autoIns.expenses);
      const expenses = doc(db, "expenses", newState.id);
      await updateDoc(expenses, {
        ...newState,
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
    expensesByCategoryAndMonth: state.expensesByCategoryAndMonth,
    getTotalsByCategoryAndMonth,
    id: state.id,
    statusState: status,
    totalsByCategory: state.totalsByCategory,
    totalsByCategoryAndMonth: state.totalsByCategoryAndMonth,
    totalByCategoryAndMonth,
    updateExpense,
  }
};

export default useExpenses;