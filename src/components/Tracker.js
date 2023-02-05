// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useRef, useState } from 'react';

import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';

import AddNewExpense from './secondaryComponents/AddNewExpense';
import ListedExpenses from './secondaryComponents/ListedExpenses';
import Tabs from './utilComponents/Tabs';

import { months, trackedExpenses } from '../utils/ericConstants';
import useExpenses from '../state/useExpenses';
import { formatDate } from '../utils/utilFunctions';

const styleProps = {
  border: 'none',
  width: '100%',
};

const Tracker = ({ category, expenses, month}) => { // Category tabs, with months as child
  const { addNewExpense, deleteExpense, owedItems, totalsByCategoryAndMonth, totalsByCategory, updateExpense } = useExpenses();
  // const { owedByEric, owedToEric } = owedItems;

  const [owedByEric, setOwedByEric] = useState(owedItems.owedByEric);
  const [owedToEric, setOwedToEric] = useState(owedItems.owedToEric);
  // console.log('Summary Totals Table totalsByCategory ',totalsByCategory)
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [monthCatTotal, setMonthCatTotal] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const addNewRow = (newRow) => {
    const updatedRow = {
      ...newRow,
      category: category,
    };
    const newRows = [...rows];
    newRows.push(updatedRow);

    addNewExpense(updatedRow, category);
    setRows(newRows);
  }

  const processRowUpdate = (newRow) => {
    const updatedRow = {
      ...newRow,
      date: formatDate(newRow.date),
      isNew: false
    };
    // console.log('processRowUpdate ', updatedRow);

    updateExpense(updatedRow, category);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    // setSnackbar({ children: error.message, severity: 'error' });
    console.log('handleProcessRowUpdateError error ', error.message)
  }, []);

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    console.log('handleCancelClick ', editedRow)
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleDeleteClick = (row) => () => {
    // console.log('handleDeleteClick ', row)
    deleteExpense(row, category);
    setRows(rows.filter((r) => r.id !== row.id));
  };

  const handleEditClick = (id) => () => {
    // console.log('handleEditClick ', id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    // console.log('handleSaveClick ', id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const organizeRowExpensesList = () => {
    let newList = [];
    let total = 0;
    if (expenses.length != 0) {
      expenses.forEach((exp, i) => {
        newList.push({
          ...exp,
          // amount: convertToInt(exp.amount),
        });
      });
      total = totalsByCategoryAndMonth[month][category];
    }

    setRows(newList);
    setMonthCatTotal(total)
  };

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
      flex: 3,
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 90,
      headerClassName: 'dataGrid-column-header',
      cellClassName: 'dataGrid-cell-action',
      flex: 2,
      getActions: (data) => {
        const { id, row } = data;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        // console.log('getActions ', id, isInEditMode)
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  useEffect(() => {
    // organizeTabContent();
  // eslint-disable-next-line
  }, []); // react-hooks/exhaustive-deps

  return (
    <div>
      <div>
        {owedByEric.length > 0 ? (
          <div>
            <div></div>
            <DataGrid
              rows={owedByEric}
              columns={columns}
              autoHeight
              editMode="row"
              sx={styleProps}
              rowHeight={25}
              hideFooter
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'dataGrid-row-even' : 'dataGrid-row-odd'
              }
              experimentalFeatures={{ newEditingApi: true }}
            />
          </div>
        ) : (
          <div>don't owe nothin</div>
        )}
      </div>
      <div>
      {owedByEric.length > 0 ? (
          <div>
            {owedByEric.map((item) => (
              <div key={item.id} >stuff somebody owes</div>
            ))}
          </div>
        ) : (
          <div>don't owe nothin</div>
        )}
      </div>
    </div>
  );
}

export default Tracker;