import { useContext } from 'react';
import { collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
import { categories } from '../utils/ericConstants';
import { roundNumberToTwo } from '../utils/utilFunctions';

const useItems = () => {
  const { owedItemsBudgetContext, spendingBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  const expensesCollectionRef = collection(db, 'expenses');
  const owedItemsCollectionRef = collection(db, 'owedItems');
  const [owedItems, setOwedItems] = owedItemsBudgetContext;
  const [spending, setSpending] = spendingBudgetContext;
  const [status, setStatus] = statusBudgetContext;

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

  function updateOwedItemCategory(updatedItem, category) {
    let itemList = [];
    // console.log('updateOwedItemCategory ', updatedItem, category, `${category}Disabled`, owedItems[`${category}Disabled`]);
    let disabledItemsList = [...owedItems[`${category}Disabled`]];

    // add item to disabled list
    disabledItemsList.push({
      ...updatedItem,
      isDisabled: true,
    });

    // remove item from active list
    owedItems[category].forEach((currItem) => {
      if (currItem.id !== updatedItem.id) {
        itemList.push(currItem);
      }
    });

    owedItems[category] = itemList;
    owedItems[`${category}Disabled`] = disabledItemsList;
    // console.log('updateOwedItemCategory ', itemList);
    totalByCategoryForOwed(itemList, category, 'add');
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

  async function getOwedItems() {
    await getDocs(owedItemsCollectionRef).then((owedItems) => {
      const owedItemsData = owedItems.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log('Firebase owedItems ', owedItemsData[0])

        setOwedItems(state => (
          { 
            ...state,
            id: owedItemsData[0].id,
            owedByEric: owedItemsData[0].owedByEric,
            owedToEric: owedItemsData[0].owedToEric,
            owedByEricDisabled: owedItemsData[0].owedByEricDisabled,
            owedToEricDisabled: owedItemsData[0].owedToEricDisabled,
            totalOwedByEric: owedItemsData[0].totalOwedByEric,
            totalOwedToEric: owedItemsData[0].totalOwedToEric,
          }
        ));
    }).catch((err) => {
      console.log(err);
    })
  }
  
  const updateOwedItemsInDatabase = async (newOwedItemsState, updateType) => {
    const uType = `${updateType}owed`;

    try {
      console.log('doc update with: ',newOwedItemsState);
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
    addNewOwedItem,
    deleteOwedItem,
    getOwedItems,
    owedItems: owedItems,
    // statusState: status,
    updateOwedItem,
    updateOwedItemCategory,
  }
};

export default useItems;