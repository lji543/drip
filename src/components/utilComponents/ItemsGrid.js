// TODO: leverage this w/ other totalTable so we can reuse (some keys are diff)
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
  LibraryAdd as LibraryAddIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';

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
    field: 'name ',
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

const ItemGrid = ({
  owedCategory,
  emptyTableMessage,
  gridColumns = baseColumns,
  gridRows,
  isShowingDisabled,
  styleProps = baseStyleProps,
  tableTotals,
}) => {

  const { deleteOwedItem, updateOwedItem, updateOwedItemCategory, owedItems } = useItems();
  const { addNewExpense, deleteExpense } = useExpenses();

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

    updateOwedItem(updatedRow, owedCategory);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    // setSnackbar({ children: error.message, severity: 'error' });
    console.log('handleProcessRowUpdateError error ', error.message)
  }, []);

  const handleActionClick = (action, row) => () => { // TODO: turn this into a switch for better readability
    // console.log('handleActionClick ', action, row, row.id)
    let callSetRows = true;
    if ( action === 'delete' || action === 'cancel') {
      if (action === 'delete') {
        if (owedCategory.includes('owed', 0)) {
          const sendCat = row.isDisabled ? `${owedCategory}Disabled` : owedCategory;

          deleteOwedItem(row, sendCat);
          console.log('deleting item ',row)
          if (row.includedInExpenses) {
            deleteExpense(row, row.category);
          }
        }
      }
      if (action === 'cancel') {
        setRowModesModel({
          ...rowModesModel,
          [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rows.find((r) => r.id === row.id);
        
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
      const updatedItem = {
        ...row,
        includedInExpenses: true,
      };
      // console.log('owedCategory ', owedCategory)
      // console.log('updatedItem ', updatedItem)
      // console.log('row.category ', row.category)
      updateOwedItem(updatedItem, owedCategory)
      addNewExpense(updatedItem, updatedItem.category, true);
    } else if ( action === 'itemIsPaid' ) {
      // mark as paid
      const updatedItem = {
        ...row,
        isPaid: true,
      };
      updateOwedItemCategory(updatedItem, owedCategory);
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
          icon={<Tooltip title="Edit"><EditIcon/></Tooltip>}
          label="Edit"
          onClick={handleActionClick('edit', row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<Tooltip title="Delete"><DeleteIcon/></Tooltip>}
          label="Delete"
          onClick={handleActionClick('delete',row)}
          color="inherit"
        />,
        <GridActionsCellItem
          className={row.includedInExpenses ? 'icon-button-disabled' : ''}
          icon={<Tooltip title="Add to Expenses"><LibraryAddIcon/></Tooltip>}
          label="Add To Expense"
          onClick={row.includedInExpenses ? '' : handleActionClick('addAsExpense',row)}
          color="inherit"
        />,
        <GridActionsCellItem
          className={row.isPaid ? 'icon-button-disabled' : ''}
          icon={<Tooltip title="Mark As Paid"><DoneAllIcon/></Tooltip>}
          label="Paid Up"
          onClick={row.isPaid ? '' : handleActionClick('itemIsPaid',row)}
          color="inherit"
        />,
      ];
    },
  };

  const columns = [...gridColumns, actionColumn];

  useEffect(() => {
    // console.log('isShowingDisabled ',isShowingDisabled)
    // console.log('gridRows ',gridRows)
    // console.log('owedCategory ',owedCategory)
    if (isShowingDisabled) {
      setRows([...gridRows, ...owedItems[`${owedCategory}Disabled`]])
    } else {
      setRows(gridRows);
    }
  // eslint-disable-next-line
  }, [gridRows, isShowingDisabled]); // react-hooks/exhaustive-deps

  return (
    <div className='dataGrid-container'>
      {rows.length > 0 ? (
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
        <div className='color-title-text'>{emptyTableMessage}</div>
      )}
      <div className='dataGrid-total-row'>
        <div className='dataGrid-totalTxt'>{tableTotals.title}</div>
        <div className='dataGrid-totalAmt'>{tableTotals.amount}</div>
      </div>
    </div>
  );
};

ItemGrid.propTypes = {
  // children: PropTypes.element.isRequired
};

export default ItemGrid;