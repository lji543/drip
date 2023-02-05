// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useRef, useState } from 'react';

import ExpensesGrid from './utilComponents/ExpensesGrid';
import AddNewItem from './utilComponents/AddNewItem';

import useExpenses from '../state/useExpenses';

const columns = [
  {
    field: 'date',
    type: 'date',
    headerName: 'Date',
    headerClassName: 'dataGrid-column-header',
    editable: true,
    cellClassName: 'dataGrid-cell',
    // flex: 1,
  },
  {
    field: 'details',
    headerName: 'Details',
    headerClassName: 'dataGrid-column-header',
    editable: true,
    cellClassName: 'dataGrid-cell',
    flex: 2,
    // width: 224,
  },
  {
    field: 'amount',
    type: 'number',
    headerName: 'Amount',
    // headerAlign: 'left',
    // align: 'left',
    headerClassName: 'dataGrid-column-header',
    editable: true,
    cellClassName: 'dataGrid-cell dataGrid-cell-amount',
    // width: 92,
    flex: 1,
  },
];

const owedByColumns = [...columns];
owedByColumns.splice(2, 0, { // owed By Eric, to someone else
  field: 'name',
  headerName: 'Owed To',
  headerClassName: 'dataGrid-column-header',
  editable: true,
  cellClassName: 'dataGrid-cell',
  flex: 2,
});

const owedToColumns = [...columns];
owedToColumns.splice(2, 0, { // owed To Eric, from someone else
  field: 'name',
  headerName: 'Owes Me',
  headerClassName: 'dataGrid-column-header',
  editable: true,
  cellClassName: 'dataGrid-cell',
  flex: 2,
});

const TrackerWithNewGridComponent = ({ category}) => { // Category tabs, with months as child
  const { addNewOwedItem, owedItems } = useExpenses();
  // console.log('owed Items ', owedItems)
  const [isAddingOwedToEricItem, setIsAddingOwedToEricItem] = useState(false);
  const [isAddingOwedByEricItem, setIsAddingOwedByEricItem] = useState(false);
  const [owedTotal, setOwedTotal] = useState({
    owedByEric: 0,
    owedToEric: 0,
  });
  const [gridRows, setGridRows] = useState({
    owedByEric: 0,
    owedToEric: 0,
  });

  const addNewRow = (newRow, category) => {
    const updatedRow = {
      ...newRow,
      category: category,
    };
    const newRows = [...gridRows[category]];
    newRows.push(updatedRow);
    // console.log('adding newRow ',newRow)
    // console.log('adding newRow ',newRows)

    addNewOwedItem(updatedRow, category);
    setGridRows({
      ...gridRows,
      [category]: newRows,
    });
  }

  const organizeRowItems = () => {
    setGridRows({
      owedByEric: owedItems.owedByEric,
      owedToEric: owedItems.owedToEric,
    });
    setOwedTotal({
      owedByEric: owedItems.totalOwedByEric,
      owedToEric: owedItems.totalOwedToEric,
    })
  };

  useEffect(() => {
    organizeRowItems();
  // eslint-disable-next-line
  }, [owedItems]); // react-hooks/exhaustive-deps

  return (
    <div className='dataGrid-page-container'>
      <div> {/* Items owed BY Eric */}
        {gridRows.owedByEric.length > 0 ? (
          <div className='dataGrid-container'>
            <div className='dataGrid-title'>Debts to Pay:</div>
            <ExpensesGrid
              category={'owedByEric'}
              emptyTableMessage={'You don\'t owe nothin'}
              gridRows={gridRows.owedByEric}
              gridColumns={owedByColumns}
              tableTotals={{
                amount: `$ ${owedTotal.owedByEric}`,
                title: 'You owe: ',
              }}
            />
            <AddNewItem
              className='bottom-spacing-12'
              category={'owedByEric'}
              isAddingExpense={isAddingOwedByEricItem}
              itemCategoryName={'Items I Owe'}
              setIsAddingExpense={setIsAddingOwedByEricItem}
              addNewRow={addNewRow}
            />
          </div>
        ) : (
          <div>{'You don\'t owe nothin'}</div> // TODO: a bit redundant
        )}
      </div>
      <div> {/* Items owed TO Eric */}
        {gridRows.owedByEric.length > 0 ? (
          <div className='dataGrid-container'>
            <div className='dataGrid-title'>Debts to Collect:</div>
            <ExpensesGrid
              category={'owedToEric'}
              emptyTableMessage={'Nobody to hound today'}
              gridRows={gridRows.owedToEric}
              gridColumns={owedToColumns}
              tableTotals={{
                amount: `$ ${owedTotal.owedToEric}`,
                title: 'Owed To You: ',
              }}
            />
            <AddNewItem
              category={'owedToEric'}
              isAddingExpense={isAddingOwedToEricItem}
              itemCategoryName={'Items Owed to Me'}
              setIsAddingExpense={setIsAddingOwedToEricItem}
              addNewRow={addNewRow}
            />
          </div>
        ) : (
          <div>{'Nobody to hound today'}</div> // TODO: a bit redundant
        )}
      </div>
    </div>
  );
}

export default TrackerWithNewGridComponent;