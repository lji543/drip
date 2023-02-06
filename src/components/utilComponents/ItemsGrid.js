// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
  LibraryAdd as LibraryAddIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';

import { months } from '../../utils/ericConstants';
import useExpenses from '../../state/useExpenses';
import useItems from '../../state/useItems';
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
];

const ItemGrid = ({
  category,
  emptyTableMessage,
  gridColumns = baseColumns,
  gridRows,
  isShowingDisabled,
  styleProps = baseStyleProps,
  tableTotals,
}) => {

  const { deleteOwedItem, updateOwedItem, updateOwedItemCategory, owedItems } = useItems();
  const { addNewExpense } = useExpenses();

  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  // const [columns, setColumns] = useState([]);
  const [monthCatTotal, setMonthCatTotal] = useState([]);
  const [rows, setRows] = useState([]); // not using rows to feed actual table??
  const [rowModesModel, setRowModesModel] = useState({});
  // console.log('Listed Expenses ', expenses)
  // console.log('owed Items ', gridRows)


  const processRowUpdate = (newRow) => {
    // console.log('processRowUpdate newRow ',newRow)
    const updatedRow = {
      ...newRow,
      date: formatDate(newRow.date),
      isNew: false
    };

    updateOwedItem(updatedRow, category);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    // setSnackbar({ children: error.message, severity: 'error' });
    console.log('handleProcessRowUpdateError error ', error.message)
  }, []);

  const handleActionClick = (action, row) => () => { // TODO: turn this into a switch for better readability
    console.log('handleActionClick ', action, row, row.id)
    let callSetRows = true;
    if ( action === 'delete' || action === 'cancel') {
      if (action === 'delete') {
        if (row.category.includes('owed', 0)) {
          deleteOwedItem(row, category);
        } else {
          // deleteExpense(row, category);
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
    } else if ( action === 'edit' ) {
      setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.Edit } });
    } else if ( action === 'addAsExpense' ) {
      // add to expense grid
      // console.log('row ',row.category)
      const updatedItem = {
        ...row,
        includedInExpenses: true,
      };

      updateOwedItem(updatedItem, category)
      addNewExpense(row, row.category, true);
    } else if ( action === 'itemIsPaid' ) {
      // mark as paid
      updateOwedItemCategory(row, category);
    } else {
      // console.log('handleActionClick saving ',)
      setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
    }
  };

  const getRowClassNames = (params) => {
    // console.log('params ',params.row)
    let classNames;
    
    if (params.row.isDisabled) {
      classNames = 'dataGrid-row-disabled';
    } else {
      classNames = params.indexRelativeToCurrentPage % 2 === 0 ? 'dataGrid-row-even' : 'dataGrid-row-odd';
    }
    // console.log('classNames ',classNames)
    return classNames
  }

  const actionColumn = {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 90,
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell-action',
    flex: 2,
    getActions: (data) => {
      // console.log('getActions data ',data)
      const { id, row } = data;
      // console.log('row ',row.includedInExpenses)
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      // console.log('getActions ', id, isInEditMode)
      // console.log('getActions ', rowModesModel[id])

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
        <GridActionsCellItem
          icon={<LibraryAddIcon color={row.includedInExpenses ? 'disabled' : ''} />}
          label="Delete"
          onClick={row.includedInExpenses ? '' : handleActionClick('addAsExpense',row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DoneAllIcon />}
          label="Delete"
          onClick={handleActionClick('itemIsPaid',row)}
          color="inherit"
        />,
      ];
    },
  };

  const columns = [...gridColumns, actionColumn];

  useEffect(() => {
    // console.log('category ',category)
    if (isShowingDisabled) {
      setRows([...gridRows, ...owedItems[`${category}Disabled`]])
    } else {
      setRows(gridRows);
    }
  // eslint-disable-next-line
  }, [isShowingDisabled]); // react-hooks/exhaustive-deps

  useEffect(() => {
    setRows(gridRows);
  // eslint-disable-next-line
  }, [gridRows]); // react-hooks/exhaustive-deps

  return (
    <div className='dataGrid-container'>
      {gridRows.length > 0 ? (
        <DataGrid
          autoHeight
          columns={columns}
          editMode="row"
          getRowClassName={(params) => getRowClassNames(params)}
          hideFooter
          onProcessRowUpdateError={handleProcessRowUpdateError}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          processRowUpdate={processRowUpdate}
          rowHeight={25}
          rowModesModel={rowModesModel}
          rows={rows}
          sx={styleProps}
          experimentalFeatures={{ newEditingApi: true }}
        />
      ) : (
        <div className='title-text-color'>{emptyTableMessage}</div>
      )}
      <div className='dataGrid-total-row'>
        <div className='dataGrid-totalTxt'>{tableTotals.title}{category}</div>
        <div className='dataGrid-totalAmt'>{tableTotals.amount}</div>
      </div>
    </div>
  );
};

ItemGrid.propTypes = {
  // children: PropTypes.element.isRequired
};

export default ItemGrid;