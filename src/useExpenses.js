import { useContext } from 'react';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'

import { db } from './utils/firebase.config';
import { BudgetContext } from "./BudgetContext";
// import { categories, totalsByCategory, expensesByCategoryAndMonth, totalsByMonthAndCategory, months } from './utils/constants';
import { categories, totalsByCategory, expensesByCategoryAndMonth, totalsByMonthAndCategory } from './utils/ericConstants';

const useExpenses = () => {
  const collectionRef = collection(db, 'expenses');
  const [state, setState] = useContext(BudgetContext);

  function addNewExpense(newExpense) {
    // TODO: set so we can send in an array or a single one
    // that way we only have to update state once when adding multiple expenses at a time (update form too)
    const month = newExpense.date.getMonth();
    const catExpenses = state.totalsByCategory[newExpense.category].expenses.push(newExpense);
    const monthExpenses = state.expensesByCategoryAndMonth[month].expenses.push(newExpense);
    // setState(state => ({ ...state, allExpenses: expenses }));
    // totalByCategory(catExpenses);
    // totalByMonth(monthExpenses);
  }

  async function getTotalsByMonthAndCategory() {
    await getDocs(collectionRef).then((expenses) => {
      let expensesData = expenses.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      if (!expensesData[0]) { // TODO: add some sort of error handling
        expensesData = {
          totalsByCategory: totalsByCategory,
          totalsByMonthAndCategory: totalsByMonthAndCategory,
        }
      } else {
        setState(state => (
          { 
            ...state,
            totalsByCategory: expensesData[0].totalsByCategory, // TODO: update this call so we don't have to ref an array index
            totalsByMonthAndCategory: expensesData[0].totalsByMonthAndCategory
          }
        ));
      }

    }).catch((err) => {
      console.log(err);
    })
  }

  function totalByMonthAndCategory(newExpensesList) {
    const expenseList = totalsByMonthAndCategory;
    let yearTotal = 0;

    expensesByCategoryAndMonth.map((monthExpenses, month) => {
      let monthTotal = 0;
      
      categories.map((cat) => {
        let catTotalForMonth = 0;

        if (monthExpenses[cat]) {
          monthExpenses[cat].expenses.map((expense) => {
            catTotalForMonth += expense.amount;
          });
        } else {
          catTotalForMonth = 0;
        }

        expenseList[month][cat] = catTotalForMonth;
        monthTotal += catTotalForMonth;
      });
      expenseList[month]._monthTotal = monthTotal;
      yearTotal =+ monthTotal;
    });

    totalsByCategory._yearTotal = yearTotal;

    categories.map(cat => {
      let catYearTotal = 0;
      [0,1,2,3,4,5,6,7,8,9,10,11].map(month => {
        catYearTotal += expenseList[month][cat];
      })

      totalsByCategory[cat].total = catYearTotal;
      totalsByCategory[cat].monthlyAvg = catYearTotal / 12;
    })

    // addExpensesToDatabase();
    setState(state => ({ ...state, totalsByMonthAndCategory: expenseList, totalsByCategory: totalsByCategory }));
  }

  const addExpensesToDatabase = async (e) => {  
    try {
      await addDoc(collectionRef, {
        ...state,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      console.log(err);
    }
  }

  return {
    addNewExpense,
    totalsByCategory: state.totalsByCategory,
    expensesByCategoryAndMonth: state.expensesByCategoryAndMonth,
    totalsByMonthAndCategory: state.totalsByMonthAndCategory,
    getTotalsByMonthAndCategory,
    totalByMonthAndCategory,
  }
};

export default useExpenses;