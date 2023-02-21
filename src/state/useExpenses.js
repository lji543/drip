import { useContext } from 'react';
import { collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import useAuth from './useAuth';
import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import { categories, expensesByCategoryAndMonth, totalsByCategory, totalsByCategoryAndMonth } from '../utils/ericConstants';
import { roundNumberToTwo } from '../utils/utilFunctions';

const useExpenses = () => {
  const { spendingBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  const { authenticatedUser, getAuthenticatedUser } = useAuth();
  // const expensesDocRef = doc(db, authenticatedUser.uid, "expenses");
  // console.log('useExpenses ', authenticatedUser)
  // const expensesCollectionRef = collection(db, 'expenses');
  
  // const userDocRef = doc(db, 'vmY4AP4x60aloImfFhO4rgl5l0k1', "mortgage");
  const [spending, setSpending] = spendingBudgetContext;
  const [status, setStatus] = statusBudgetContext;

  function addNewExpense(newExpense, category, owedItem) { // TODO: combine with update fn
    // TODO: add catch to that duplicate expenses cannot be added
    // i.e. look for matching id's
    const { expensesByCategoryAndMonth } = spending;
    let expenseList = [];
    // const date = new Date(`${newExpense.date}T00:00-0800`);
    // const month = date.getMonth();
    // T00:00:00
    // console.log('newExpense ', newExpense.date);
    const dateArray = newExpense.date.split("/");  // TODO: workaround
    const month = dateArray[0] - 1;
    const num = parseInt(dateArray[1]) + 1;
    const numString = num.toLocaleString('en-US');
    const newDate = `${dateArray[0]}/${numString}/${dateArray[2]}`

    // console.log('addNewExpense ', newExpense, category, owedItem);
    // console.log('expensesByCategoryAndMonth ', expensesByCategoryAndMonth);
    // console.log('month ', month);
    if (!expensesByCategoryAndMonth[month][category]) {
      expensesByCategoryAndMonth[month][category] = { expenses: [] };
      // expenseList = [...expensesByCategoryAndMonth[month][category].expenses];
    }
   
    expenseList = [...expensesByCategoryAndMonth[month][category].expenses];

    const updatedNewExpense = { // TODO: workaround
      ...newExpense,
      date: newDate,
    }
    // expenseList.push(newExpense);
    expenseList.push(updatedNewExpense);

    expensesByCategoryAndMonth[month][category].expenses = expenseList;
    // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth[month][category])
    totalByCategoryAndMonth(expensesByCategoryAndMonth, 'add');
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
    const { expensesByCategoryAndMonth, totalsByCategory, totalsByCategoryAndMonth } = spending;
    const expenseList = totalsByCategoryAndMonth;
    const newExpensesByCategoryAndMonth = newMonthCategoryArray || expensesByCategoryAndMonth;
    // console.log('totalByCategoryAndMonth ',newMonthCategoryArray)
    // console.log('totalByCategoryAndMonth ',expensesByCategoryAndMonth)
    // console.log('newExpensesByCategoryAndMonth ',newExpensesByCategoryAndMonth)

    let yearTotal = 0;

    newExpensesByCategoryAndMonth.map((monthExpenses, month) => { // stored by month, then category
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
        yearTotal += monthTotal
      );
    });

    totalsByCategoryAndMonth._yearTotal = roundNumberToTwo(yearTotal);
    totalsByCategoryAndMonth._yearAverage = roundNumberToTwo(yearTotal / 12);

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

    const newSpendingState = {
      ...spending,
      expensesByCategoryAndMonth: newExpensesByCategoryAndMonth,
      totalsByCategoryAndMonth: expenseList,
      totalsByCategory: totalsByCategory
    }
    // console.log('newExpensesByCategoryAndMonth ',newExpensesByCategoryAndMonth)
    // console.log('expenseList ',expenseList)
    // console.log('totalsByCategory ',totalsByCategory)
    
    setSpending(newSpendingState);
    
    if (newMonthCategoryArray && updateType) { // TODO: is this separation necessary? separate functions, state updates and db calls?
      updateExpensesInDatabase(newSpendingState, updateType)
        .then(() => {
          setTimeout(() => setStatus({
            updateType: null,
            result: null,
          }), 6000);
        });
    }
  }

  async function getTotalsByCategoryAndMonth() {
    const expensesDocRef = doc(db, authenticatedUser.uid, "expenses");
    // await getDocs(expensesDocRef).then((expenses) => {
    //   const expensesData = expenses.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    await getDoc(expensesDocRef).then((expenses) => {
      const expensesData = expenses.data();

      // console.log('***Firebase Expenses ', expensesData)

      // if (!expensesData[0]) { // TODO: add some sort of error handling
      //   expensesData = {
      //     totalsByCategory: totalsByCategory,
      //     totalsByCategoryAndMonth: totalsByCategoryAndMonth,
      //   }
      // } else {
      //   console.log('getTotalsByCategoryAndMonth - not setting ', expensesData[0])
      // TODO: will have to figure out how to load temp data for new users - or maybe just auto-update with constant data if an empty data obj is returned
      // const expByCatMo = expensesData.expensesByCategoryAndMonth?.length > 0 ? expensesData.expensesByCategoryAndMonth : expensesByCategoryAndMonth;
      // const totalsByCat = expensesData.totalsByCategory?.length > 0 ? expensesData.totalsByCategory : totalsByCategory;
      // const totalsByCatMo = expensesData.totalsByCategoryAndMonth?.length > 0 ? expensesData.totalsByCategoryAndMonth : totalsByCategoryAndMonth;
      const expByCatMo = expensesData.expensesByCategoryAndMonth;
      const totalsByCat = expensesData.totalsByCategory;
      const totalsByCatMo = expensesData.totalsByCategoryAndMonth;
      // console.log(expensesData.totalsByCategory.length > 0)
      // console.log(totalsByCategory)
        setSpending(state => (
          { 
            ...state,
            expensesByCategoryAndMonth: expByCatMo,
            totalsByCategory: totalsByCat,
            totalsByCategoryAndMonth: totalsByCatMo,
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

  return {
    addNewExpense,
    deleteExpense,
    expensesByCategoryAndMonth: spending.expensesByCategoryAndMonth,
    getTotalsByCategoryAndMonth,
    id: spending.id,
    statusState: status,
    totalsByCategory: spending.totalsByCategory,
    totalsByCategoryAndMonth: spending.totalsByCategoryAndMonth,
    totalByCategoryAndMonth,
    updateExpense,
  }
};

export default useExpenses;