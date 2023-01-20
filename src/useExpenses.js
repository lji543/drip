import { useContext } from 'react';

import { BudgetContext } from "./BudgetContext";
import { categories, expensesByCategory, expensesByMonth, expensesByMonthAndCategory, months } from './utils/constants'

const useExpenses = () => {
  const [state, setState] = useContext(BudgetContext);

  function addNewExpense(newExpense) {
    // TODO: set so we can send in an array or a single one
    // that way we only have to update state once when adding multiple expenses at a time (update form too)
    const month = newExpense.date.getMonth();
    const catExpenses = state.expensesByCategory[newExpense.category].expenses.push(newExpense);
    const monthExpenses = state.ExpensesByMonth[month].expenses.push(newExpense);
    // setState(state => ({ ...state, allExpenses: expenses }));
    // totalByCategory(catExpenses);
    totalByMonth(monthExpenses);
  }

  function totalByCategory(newExpensesList) {
    const expenseList = newExpensesList ? newExpensesList : state.expensesByCategory;
    // TODO: just add the new expense to the total, instead of re-running the whole thing
    Object.keys(expenseList).forEach(category => {
      let total = 0;
      expenseList[category].expenses.forEach(exp => {
        total += exp.amount;
      });
      expenseList[category].total = total;
    });
    setState(state => ({ ...state, expensesByCategory: expenseList }));
  }
  // TODO: combine these two functions ^
  function totalByMonth(newExpensesList) {
    // TODO: make year dynamic
    // const allExpenses = newExpensesList ? newExpensesList : state.expensesByMonth;
    const expenseList = newExpensesList;

    months.forEach((month, i) => {
      let total = 0;
      let expByCat;
      expenseList[i].expenses.forEach(expGroup => {
        // total += exp.amount;
        expByCat = totalByCategory(expGroup);
      });
      expenseList[i].total = total;
    });
    setState(state => ({ ...state, expensesByMonth: expenseList }));
  }

  function totalByMonthAndCategory(newExpensesList) {
    // const allExpenses = newExpensesList ? newExpensesList : state.expensesByMonth;
    // expensesByMonthAndCategory
    const expenseList = expensesByMonthAndCategory;
    let yearTotal = 0;

    expensesByMonth.map((monthExpenses, month) => {
      // console.log('month ', month)
      let monthTotal = 0;
      categories.map((cat) => {
        let catTotal = 0;
        monthExpenses[cat].expenses.map((expense) => {
          catTotal += expense.amount;
        });
        expenseList[month][cat].catTotal = catTotal;
        expensesByCategory[cat].total += catTotal;
        monthTotal += catTotal;
        // console.log('expenseList ',expenseList)
        // console.log('monthTotal ',monthTotal)
        // console.log('catTotal ',cat, catTotal)
      });
      expenseList[month].monthTotal = monthTotal;
      yearTotal =+ monthTotal;
    });
    expenseList.yearTotal = yearTotal;

    setState(state => ({ ...state, expensesByMonthAndCategory: expenseList }));
  }

  return {
    addNewExpense,
    // allExpenses: state.allExpenses,
    expensesByCategory: state.expensesByCategory,
    expensesByMonth: state.expensesByMonth,
    expensesByMonthAndCategory: state.expensesByMonthAndCategory,
    totalByCategory,
    totalByMonth,
    totalByMonthAndCategory,
  }
};

export default useExpenses;