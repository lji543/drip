import { useContext } from 'react';
import { collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import useAuth from './useAuth';
import { db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";

const useItems = () => {
  const { owedItemsBudgetContext, statusBudgetContext } = useContext(BudgetContext);
  // const owedItemsCollectionRef = collection(db, 'owedItems');
  const [owedItems, setOwedItems] = owedItemsBudgetContext;
  const [status, setStatus] = statusBudgetContext;
  const { authenticatedUser, getAuthenticatedUser } = useAuth();

  function addNewOwedItem(newItem, owedCategory) { // TODO: combine with update fn
    let itemList = [...owedItems[owedCategory]];
    // console.log('addNewOwedItem ', newItem, owedCategory);

    itemList.push(newItem);

    owedItems[owedCategory] = itemList;
    totalByCategoryForOwed(itemList, owedCategory, 'add');
  }

  function deleteOwedItem(deletedItem, owedCategory) { // combine these update fn's for items and for expenses
    let itemList = [];
    // console.log('deleteOwedItem ',deletedItem, owedCategory)
    // console.log('deleteOwedItem ',owedItems[owedCategory])
    owedItems[owedCategory].forEach((currItem) => {
      if (currItem.id !== deletedItem.id) {
        itemList.push(currItem);
      }
    });
    // console.log('deleteOwedItem ',itemList)
    owedItems[owedCategory] = itemList;
    totalByCategoryForOwed(itemList, owedCategory, 'delete');
  }

  function updateOwedItem(updatedItem, owedCategory) {
    let itemList = owedItems[owedCategory].map((currItem) => {
      if (currItem.id === updatedItem.id) {
        currItem = updatedItem;
      }
      return currItem;
    });

    owedItems[owedCategory] = itemList;
    // console.log('updateOwedItem ',owedCategory)
    // console.log('updateOwedItem ',itemList)
    // console.log('updateOwedItem ',owedItems[owedCategory])
    totalByCategoryForOwed(itemList, owedCategory, 'update');
  }

  function updateOwedItemCategory(updatedItem, owedCategory) {
    let itemList = [];
    // console.log('updateOwedItemCategory ', updatedItem, category, `${category}Disabled`, owedItems[`${category}Disabled`]);
    let disabledItemsList = [...owedItems[`${owedCategory}Disabled`]];

    // add item to disabled list
    disabledItemsList.push({
      ...updatedItem,
      isDisabled: true,
    });

    // remove item from active list
    owedItems[owedCategory].forEach((currItem) => {
      if (currItem.id !== updatedItem.id) {
        itemList.push(currItem);
      }
    });

    owedItems[owedCategory] = itemList;
    owedItems[`${owedCategory}Disabled`] = disabledItemsList;
    // console.log('updateOwedItemCategory ', itemList);
    totalByCategoryForOwed(itemList, owedCategory, 'add');
  }

  function totalByCategoryForOwed(newCategoryArray, owedCategory, updateType) {
    // console.log('totalByCategoryForOwed ',newCategoryArray,' | ', owedCategory,' | ', updateType)
    const newItemsByCategory = newCategoryArray || owedItems[owedCategory];

    const totalKeyName = `total${owedCategory.charAt(0).toUpperCase() + owedCategory.slice(1)}`;

    let catTotal = 0;

    // newItemsByCategory[owedCategory].map((item) => { 
    newItemsByCategory.map((item) => { 
      return catTotal += item.amount;
    });
    // console.log('totalByCategory catTotal ',catTotal)
    // console.log('totalByCategory totalKeyName ',totalKeyName)

    const newOwedItemsState = {
      ...owedItems,
      // [owedCategory]: {
      // // owedByEric: {
      //   ...newItemsByCategory,
      // },
      [totalKeyName]: catTotal,
    }

    // console.log('totalByCategory ',newOwedItemsState)
    setOwedItems(newOwedItemsState);
    // setOwedItems(test);
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
    const owedItemsDocRef = doc(db, authenticatedUser.uid, "owedItems");

    await getDoc(owedItemsDocRef).then((owedItems) => {
      const owedItemsData = owedItems.data();
      console.log('OWED ITEMS ',owedItemsData)

      setOwedItems(state => (
        { 
          ...state,
          // id: owedItemsData.id,
          owedByEric: owedItemsData.owedByEric || [],
          owedToEric: owedItemsData.owedToEric || [],
          owedByEricDisabled: owedItemsData.owedByEricDisabled || [],
          owedToEricDisabled: owedItemsData.owedToEricDisabled || [],
          totalOwedByEric: owedItemsData.totalOwedByEric || [],
          totalOwedToEric: owedItemsData.totalOwedToEric || [],
        }
      ));
    }).catch((err) => {
      console.log(err);
    })
  }
  
  const updateOwedItemsInDatabase = async (newOwedItemsState, updateType) => {
    const uType = `${updateType}owed`;
    const owedItemsDocRef = doc(db, authenticatedUser.uid, "owedItems");

    try {
      // console.log('doc update with: ',newOwedItemsState);
      await updateDoc(owedItemsDocRef, {
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