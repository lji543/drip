// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';

import useExpenses from '../../state/useExpenses';
import { formatDate } from '../../utils/utilFunctions';

const baseStyleProps = {
  border: 'none',
  width: '100%',
};

const baseColumns = [
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

const ExpensesGrid = ({
  category,
  emptyTableMessage,
  gridColumns = baseColumns,
  gridRows,
  isOwedExpenses,
  styleProps = baseStyleProps,
  tableTotals,
}) => {
  const { deleteExpense, deleteOwedItem, updateExpense  } = useExpenses();

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  // console.log('Listed Expenses ', expenses)
  // console.log('owed Items ', gridRows)

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

  const handleActionClick = (action, row) => () => { // TODO: turn this into a switch for better readability
    console.log('handleActionClick ', action, row) //////////////// LEFT OFF HERE */*/*/*/*/*/
    let callSetRows = true;
    if ( action === 'delete' || action === 'cancel') {
      if (action === 'delete') {
        if (row.category.includes('owed', 0)) {
          deleteOwedItem(row, category);
        } else {
          deleteExpense(row, category);
        }
      }
      if (action === 'cancel') {
        setRowModesModel({
          ...rowModesModel,
          [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rows.find((r) => r.id === row.id);
        // console.log('handleCancelClick ', editedRow)
        // if (editedRow.isNew) {
        //   setRows(rows.filter((row) => row.id !== id));
        // }
        if (!editedRow.isNew) {
          callSetRows = false;
        }
      }
      if (callSetRows) {
        setRows(rows.filter((r) => r.id !== row.id));
      }
    }
    setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
  };

  const actionColumn = {
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
            onClick={handleActionClick('save', row)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleActionClick('cancel', row)}
            color="inherit"
          />,
        ];
      }

      if (isOwedExpenses) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleActionClick('save', row)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleActionClick('cancel', row)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleActionClick('edit', row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleActionClick('delete',row)}
          color="inherit"
        />,
      ];
    },
  };

  const columns = [...gridColumns, actionColumn];

  useEffect(() => {
    // organizeGridRows();
  // }, [category, month, totalsByCategoryAndMonth]);
  // eslint-disable-next-line
  }, []); // react-hooks/exhaustive-deps

  useEffect(() => {
    // setMonthCatTotal(totalsByCategoryAndMonth[month][category]);
  // }, [organizeRowExpensesList]);
  // eslint-disable-next-line
  }, [rows]); // react-hooks/exhaustive-deps

  return (
    <div className='dataGrid-container'>
      {gridRows.length > 0 ? (
        <DataGrid
          rows={gridRows}
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
        <div className='title-text-color'>{emptyTableMessage}</div>
      )}
      <div className='dataGrid-total-row'>
        <div className='dataGrid-totalTxt'>{tableTotals.title}</div>
        <div className='dataGrid-totalAmt'>{tableTotals.amount}</div>
      </div>
    </div>
  );
};

ExpensesGrid.propTypes = {
  // children: PropTypes.element.isRequired
};

export default ExpensesGrid;