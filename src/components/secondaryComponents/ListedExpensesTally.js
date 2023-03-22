// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';

import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';

import AddNewExpense from '../utilComponents/AddNewExpense';
import { months } from '../../utils/ericConstants';
import useExpenses from '../../state/useExpenses';
import { convertToString, formatDate } from '../../utils/utilFunctions';

const styleProps = {
  border: 'none',
  width: '100%',
};
// TODO: do we really need to pass expenses in? Could grab that from state
const ListedExpensesTally = ({ expenses, month}) => {
  const { addNewExpense, deleteExpense, totalsByCategoryAndMonth, yearTotalsByCategory, updateExpense  } = useExpenses();

  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [monthTotal, setMonthTotal] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  // console.log('Listed Expenses Tally ', expenses)
  // console.log('ListedExpenses totalsByCategoryAndMonth ', totalsByCategoryAndMonth[month][category])
  
  const addNewRow = (newRow) => {
    const updatedRow = {
      ...newRow,
      category: newRow.category,
    };
    const newRows = [...rows];
    newRows.push(updatedRow);
    // console.log('updateRow ', updatedRow.date)

    addNewExpense(updatedRow, newRow.category);
    setRows(newRows);
  }

  const processRowUpdate = (newRow) => {
    const updatedRow = {
      ...newRow,
      date: formatDate(newRow.date),
      isNew: false
    };
    // console.log('processRowUpdate ', updatedRow);

    updateExpense(updatedRow, newRow.category);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    // setSnackbar({ children: error.message, severity: 'error' });
    console.log('handleProcessRowUpdateError error ', error.message)
  }, []);

  const handleCancelClick = (id) => () => {
    // setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // });

    // const editedRow = rows.find((row) => row.id === id);
    // console.log('handleCancelClick ', editedRow)
    // if (editedRow.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  const handleDeleteClick = (row) => () => {
    // console.log('handleDeleteClick ', row)
    deleteExpense(row, row.category);
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
    // let newList = [];
    // let total = 0;
    // // console.log('->ListedExpensesTally<- totalsByCategoryAndMonth ',totalsByCategoryAndMonth)
    // // console.log('->ListedExpensesTally<- yearTotalsByCategory ',yearTotalsByCategory)
    
    // if (expenses.length !== 0) {
    //   expenses.forEach((exp, i) => {
    //     newList.push({
    //       ...exp,
    //       // amount: convertToInt(exp.amount),
    //     });
    //   });
    //   // total = totalsByCategoryAndMonth[month][category];
    // }

    // setRows(newList);
    // setMonthTotal(total)
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
      field: 'name',
      headerName: 'Description',
      headerClassName: 'dataGrid-column-header',
      editable: true,
      cellClassName: 'dataGrid-cell',
      flex: 3,
      // width: 224,
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
      field: 'category',
      headerName: 'Category',
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
    // organizeRowExpensesList();
    // if (expenses.length > 0) {
      // console.log('resetting rows ',month, expenses)
      setRows(expenses);
    // }
  // eslint-disable-next-line
  }, [expenses]); // react-hooks/exhaustive-deps

  return (
    <div className='dataGrid-page-container'>
      {rows.length > 0 ? (
        <DataGrid
          rows={rows}
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
      ) : (
        <div className='color-title-text'>
          {`There are no expenses for ${convertToString(months[month])}`}
        </div>
      )}
      <div className='dataGrid-total-row'>
        <div className='dataGrid-totalTxt'>
          {`${months[month]} Total:`}
        </div>
        <div className='dataGrid-totalAmt'>{`$ ${convertToString(monthTotal)}`}</div>
      </div>
      {/* <AddNewExpense
        category={category}
        itemCategoryName={categoryName}
        isAddingExpense={isAddingExpense}
        setIsAddingExpense={setIsAddingExpense}
        addNewRow={addNewRow}
        month={month}
      /> */}
    </div>
  );
}

export default ListedExpensesTally;