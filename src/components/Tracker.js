// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';

import {
  MoneyOff as MoneyOffIcon,
} from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import ItemsGrid from './utilComponents/ItemsGrid';
import AddNewItem from './utilComponents/AddNewItem';

import useItems from '../state/useItems';

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
    field: 'name',
    headerName: 'Description',
    headerClassName: 'dataGrid-column-header',
    editable: true,
    cellClassName: 'dataGrid-cell',
    flex: 2,
    // width: 224,
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
  field: 'owedToBy',
  headerName: 'Owed To',
  headerClassName: 'dataGrid-column-header',
  editable: true,
  cellClassName: 'dataGrid-cell',
  flex: 2,
});

const owedToColumns = [...columns];
owedToColumns.splice(2, 0, { // owed To Eric, from someone else
  field: 'owedToBy',
  headerName: 'Owes Me',
  headerClassName: 'dataGrid-column-header',
  editable: true,
  cellClassName: 'dataGrid-cell',
  flex: 2,
});

const Tracker = () => {
  const { addNewOwedItem, owedItems } = useItems();
  console.log('owed Items ', owedItems)
  const [isAddingOwedToEricItem, setIsAddingOwedToEricItem] = useState(false);
  const [isAddingOwedByEricItem, setIsAddingOwedByEricItem] = useState(false);
  const [isShowingOwedByDisabled, setIsShowingOwedByDisabled] = useState(false);
  const [isShowingOwedToDisabled, setIsShowingOwedToDisabled] = useState(false);
  const [owedTotal, setOwedTotal] = useState({
    owedByEric: 0,
    owedToEric: 0,
  });
  const [gridRows, setGridRows] = useState({
    owedByEric: [],
    owedToEric: [],
  });

  const addNewRow = (newRow, owedCategory) => {
    const updatedRow = {
      ...newRow,
      // category: owedCategory,
    };
    // console.log('addNewRow ',gridRows)
    // console.log('addNewRow ',owedCategory,newRow)
    const newRows = [...gridRows[owedCategory]];
    newRows.push(updatedRow);
    // console.log('adding newRow ',newRow)
    // console.log('adding newRow ',newRows)

    addNewOwedItem(updatedRow, owedCategory);
    setGridRows({
      ...gridRows,
      [owedCategory]: newRows,
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
    // console.log('Tracker ', owedItems)
    organizeRowItems();
  // eslint-disable-next-line
  }, [owedItems]); // react-hooks/exhaustive-deps

  return (
    <div className='dataGrid-page-container'>
      <div> {/* Items owed BY Eric */}
        <div className='dataGrid-container'>
          <div className='dataGrid-title'>Debts to Pay:</div>
          <ItemsGrid
            owedCategory={'owedByEric'}
            emptyTableMessage={'You don\'t owe nothin'}
            gridRows={gridRows.owedByEric}
            gridColumns={owedByColumns}
            isShowingDisabled={isShowingOwedByDisabled}
            tableTotals={{
              amount: `$ ${owedTotal.owedByEric}`,
              title: 'You owe: ',
            }}
          />
          <div className='button-container'>
            <Button 
              className={`button top-margin-24${owedItems.owedByEricDisabled.length === 0 ? ' button-disabled' : ''}`}
              disabled={owedItems.owedByEricDisabled.length === 0 ? true : false}
              startIcon={<MoneyOffIcon />}
              onClick={() => setIsShowingOwedByDisabled(!isShowingOwedByDisabled)}
            >
              {`${isShowingOwedByDisabled && owedItems.owedByEricDisabled.length > 0 ? 'Hide' : 'Show'} Paid Items`}
            </Button>
          </div>
          <AddNewItem
            className='bottom-margin-48'
            owedCategory={'owedByEric'}
            isAddingItem={isAddingOwedByEricItem}
            itemCategoryName={'Items I Owe'}
            setIsAddingItem={setIsAddingOwedByEricItem}
            addNewRow={addNewRow}
          />
        </div>
      </div>
      <Divider />
      <div> {/* Items owed TO Eric */}
        <div className='dataGrid-container'>
          <div className='dataGrid-title'>Debts to Collect:</div>
          <ItemsGrid
            owedCategory={'owedToEric'}
            emptyTableMessage={'Nobody to hound today'}
            gridRows={gridRows.owedToEric}
            gridColumns={owedToColumns}
            isShowingDisabled={isShowingOwedToDisabled}
            tableTotals={{
              amount: `$ ${owedTotal.owedToEric}`,
              title: 'Owed To You: ',
            }}
          />
          <div className='button-container'>
            <Button
              className='button top-margin-24'
              disabled={owedItems.owedByEricDisabled.length === 0 ? true : false}
              startIcon={<MoneyOffIcon />}
              onClick={() => setIsShowingOwedToDisabled(!isShowingOwedToDisabled)}
            >
              {`${isShowingOwedToDisabled ? 'Hide' : 'Show'} Paid Items`}
            </Button>
          </div>
          <AddNewItem
            owedCategory={'owedToEric'}
            isAddingItem={isAddingOwedToEricItem}
            itemCategoryName={'Items Owed to Me'}
            setIsAddingItem={setIsAddingOwedToEricItem}
            addNewRow={addNewRow}
          />
        </div>
      </div>
    </div>
  );
}

export default Tracker;