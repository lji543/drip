import { useContext } from 'react';
import { collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import { categories } from '../utils/ericConstants';
import { roundNumberToTwo } from '../utils/utilFunctions';

const useExpenses = () => {
  const { owedItemsBudgetContext, spendingBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  const expensesCollectionRef = collection(db, 'expenses');
  const owedItemsCollectionRef = collection(db, 'owedItems');
  const [owedItems, setOwedItems] = owedItemsBudgetContext;
  const [spending, setSpending] = spendingBudgetContext;
  const [status, setStatus] = statusBudgetContext;

  function addNewExpense(newExpense, category, owedItem) { // TODO: combine with update fn
    const { expensesByCategoryAndMonth } = spending;
    let expenseList = [];
    const date = new Date(newExpense.date);
    const month = date.getMonth();

    // console.log('addNewExpense ', newExpense, category);
    // console.log('expensesByCategoryAndMonth ', expensesByCategoryAndMonth);
    // console.log('month ', month);
    if (!expensesByCategoryAndMonth[month][category]) {
      expensesByCategoryAndMonth[month][category] = { expenses: [] };
      // expenseList = [...expensesByCategoryAndMonth[month][category].expenses];
    }
   
    expenseList = [...expensesByCategoryAndMonth[month][category].expenses];

    expenseList.push(newExpense);

    expensesByCategoryAndMonth[month][category].expenses = expenseList;
    // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth[month][category])
    totalByCategoryAndMonth(expensesByCategoryAndMonth, 'add');
  }

  function addNewOwedItem(newItem, category) { // TODO: combine with update fn
    let itemList = [...owedItems[category]];
    // console.log('addNewOwedItem ', newItem, category);

    itemList.push(newItem);

    owedItems[category] = itemList;
    // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth[month][category])
    totalByCategoryForOwed(itemList, category, 'add');
  }

  function deleteOwedItem(deletedItem, category) { // combine these update fn's for items and for expenses
    let itemList = [];

    owedItems[category].forEach((currItem) => {
      if (currItem.id !== deletedItem.id) {
        itemList.push(currItem);
      }
    });

    owedItems[category] = itemList;
    // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth)
    totalByCategoryForOwed(itemList, category, 'delete');
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

  function updateOwedItem(updatedItem, category) {
    let itemList = owedItems[category].map((currItem) => {
      if (currItem.id === updatedItem.id) {
        currItem = updatedItem;
      }
      return currItem;
    });

    owedItems[category] = itemList;
    // console.log('expensesByCategoryAndMonth ',expensesByCategoryAndMonth)
    totalByCategoryForOwed(itemList, category, 'update');
  }

  function totalByCategoryForOwed(newCategoryArray, category, updateType) {
    console.log('totalByCategoryForOwed ',newCategoryArray, category, updateType)
    const newItemsByCategory = newCategoryArray || owedItems[category];
    // console.log('totalByCategory ',newItemsByCategory)
    // console.log('totalByCategory ',category)
    // console.log('totalByCategory ',updateType)
    // console.log('owedItems ',owedItems)

    const totalKeyName = `total${category.charAt(0).toUpperCase() + category.slice(1)}`;
  
    // const totalKeyName = `total${category}`;

    let catTotal = 0;

    // newItemsByCategory[category].map((item) => { 
    newItemsByCategory.map((item) => { 
      return catTotal += item.amount;
    });
    // console.log('totalByCategory catTotal ',catTotal)
    // console.log('totalByCategory totalKeyName ',totalKeyName)

    const newOwedItemsState = {
      ...owedItems,
      // [category]: {
      // // owedByEric: {
      //   ...newItemsByCategory,
      // },
      [totalKeyName]: catTotal,
    }

    setOwedItems(newOwedItemsState);
    // setOwedItems(test);
    // console.log('totalByCategory ',owedItems)
    // console.log('totalByCategory test ',test)
    updateOwedItemsInDatabase(newOwedItemsState, updateType)
    .then(() => {
      setTimeout(() => setStatus({
        updateType: null,
        result: null,
      }), 6000);
    });
  }

  function totalByCategoryAndMonth(newMonthCategoryArray, updateType) {
    const { expensesByCategoryAndMonth, totalsByCategory, totalsByCategoryAndMonth } = spending;
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

    const newSpendingState = {
      ...spending,
      expensesByCategoryAndMonth: newExpensesByCategoryAndMonth,
      totalsByCategoryAndMonth: expenseList,
      totalsByCategory: totalsByCategory
    }
    
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
    await getDocs(expensesCollectionRef).then((expenses) => {
      const expensesData = expenses.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // console.log('Firebase Expenses ', expensesData[0])

      // if (!expensesData[0]) { // TODO: add some sort of error handling
      //   expensesData = {
      //     totalsByCategory: totalsByCategory,
      //     totalsByCategoryAndMonth: totalsByCategoryAndMonth,
      //   }
      // } else {
      //   console.log('getTotalsByCategoryAndMonth - not setting ', expensesData[0])
        setSpending(state => (
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

  async function getOwedItems() {
    await getDocs(owedItemsCollectionRef).then((owedItems) => {
      const owedItemsData = owedItems.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // console.log('Firebase Expenses ', owedItemsData[0])

        setOwedItems(state => (
          { 
            ...state,
            id: owedItemsData[0].id,
            owedByEric: owedItemsData[0].owedByEric,
            owedToEric: owedItemsData[0].owedToEric,
            totalOwedByEric: owedItemsData[0].totalOwedByEric,
            totalOwedToEric: owedItemsData[0].totalOwedToEric,
          }
        ));
    }).catch((err) => {
      console.log(err);
    })
  }

  const updateExpensesInDatabase = async (newSpendingState, updateType) => {
    try {
      console.log('doc update with: ',newSpendingState.expensesByCategoryAndMonth[1]);
      const expenses = doc(db, "expenses", newSpendingState.id);
      await updateDoc(expenses, {
        ...newSpendingState,
        timestamp: serverTimestamp(),
      });
      setStatus({ updateType, result: 'success' });
    } catch (err) {
      setStatus({ updateType, result: 'error'});
      console.log(err);
    }
  }
  
  const updateOwedItemsInDatabase = async (newOwedItemsState, updateType) => {
    const uType = `${updateType}owed`;

    try {
      // console.log('doc update with: ',newOwedItemsState);
      const owedItems = doc(db, "owedItems", newOwedItemsState.id);
      await updateDoc(owedItems, {
        ...newOwedItemsState,
        timestamp: serverTimestamp(),
      });
      setStatus({ uType, result: 'success' });
    } catch (err) {
      setStatus({ uType, result: 'error'});
      console.log(err);
    }
  }

  return {
    addNewExpense,
    addNewOwedItem,
    deleteExpense,
    deleteOwedItem,
    expensesByCategoryAndMonth: spending.expensesByCategoryAndMonth,
    getOwedItems,
    getTotalsByCategoryAndMonth,
    id: spending.id,
    owedItems: owedItems,
    statusState: status,
    totalsByCategory: spending.totalsByCategory,
    totalsByCategoryAndMonth: spending.totalsByCategoryAndMonth,
    totalByCategoryAndMonth,
    updateExpense,
    updateOwedItem,
  }
};

export default useExpenses;