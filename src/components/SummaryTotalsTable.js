import React, { useEffect, useRef, useState } from 'react';

import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@mui/x-data-grid';

import { months } from '../utils/ericConstants';
import useExpenses from '../state/useExpenses';
import { formatDate, convertToFormattedRoundNumber } from '../utils/utilFunctions';
import { categories } from '../utils/ericConstants';

const styleProps = {
  border: 'none',
  width: '100%',
};

function CustomToolbar(isMobile) {
  if (isMobile) {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: 'category',
    headerName: 'Category',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    flex: 1,
    minWidth: 124,
    // maxWidth: 75,
  },
  {
    field: 'details',
    headerName: '',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    flex: 1,
    minWidth: 156,
    // maxWidth: 75,
  },
  {
    field: 'Jan',
    headerName: 'Jan',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Feb',
    headerName: 'Feb',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Mar',
    headerName: 'Mar',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Apr',
    headerName: 'Apr',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'May',
    headerName: 'May',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Jun',
    headerName: 'Jun',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Jul',
    headerName: 'Jul',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Aug',
    headerName: 'Aug',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Sep',
    headerName: 'Sep',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Oct',
    headerName: 'Oct',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Nov',
    headerName: 'Nov',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'Dec',
    headerName: 'Dec',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell',
    maxWidth: 68,
  },
  {
    field: 'total',
    headerName: 'Total',
    headerAlign: 'right',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell right-align',
    maxWidth: 80,
    // type: 'number',
  },
  {
    field: 'average',
    headerName: 'Average',
    headerAlign: 'right',
    headerClassName: 'dataGrid-column-header',
    cellClassName: 'dataGrid-cell right-align',
    maxWidth: 80,
    // type: 'number',
  },
];

const SummaryTotalsTable = () => {
  const pageRef = useRef();
  const { totalsByCategory, totalsByCategoryAndMonth } = useExpenses();

  const [isMobile, setIsMobile] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const getRows = () => {
    let updatedRows = [];
    let totalsRow = {
      id: 'totalsRow',
      category: 'Totals: ',
      total: convertToFormattedRoundNumber(totalsByCategoryAndMonth._yearTotal),
      average: convertToFormattedRoundNumber(totalsByCategoryAndMonth._yearAverage),
    };
    
    categories.forEach((cat) => {
      let updatedRow = {
        id: cat,
        category: totalsByCategory[cat].name,
        details: totalsByCategory[cat].details,
        total: convertToFormattedRoundNumber(totalsByCategory[cat].total),
        average: convertToFormattedRoundNumber(totalsByCategory[cat].monthlyAvg),
      };
      months.forEach((mo, i) => {
        updatedRow = {
          ...updatedRow,
          [mo]: convertToFormattedRoundNumber(totalsByCategoryAndMonth[i][cat]),
        }

        totalsRow = {
          ...totalsRow,
          [mo]: convertToFormattedRoundNumber(totalsByCategoryAndMonth[i]._monthTotal),
        }
      });
      updatedRows.push(updatedRow);
    });

    updatedRows.push({ id: 'blankRow' });
    updatedRows.push(totalsRow);
    // console.log('updatedRows ',updatedRows)

    setRows(updatedRows);
  }

  const getDataGridContainerSize = () => {
    const clientWidth = pageRef.current?.clientWidth;

    if (clientWidth < 784) {
      setIsMobile(true);
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = {
      ...newRow,
      date: formatDate(newRow.date),
      isNew: false
    };
    // console.log('processRowUpdate ', updatedRow);

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    // setSnackbar({ children: error.message, severity: 'error' });
    console.log('handleProcessRowUpdateError error ', error.message)
  }, []);

  useEffect(() => {
    getDataGridContainerSize(); // TODO: should we also set this up to fire when screen sizes change?
    getRows();
  // eslint-disable-next-line
  }, [totalsByCategory]); // react-hooks/exhaustive-deps

  return (
    <div ref={pageRef} className='dataGrid-table-container'>
      {rows.length > 0 ? (
        <DataGrid
          autoHeight
          columns={columns}
          components={{
            Toolbar: () => CustomToolbar(isMobile),
          }}
          disableColumnMenu
          editMode="row"
          getRowClassName={(params) => {
            if (params.isLastVisible) {
              return 'dataGrid-row-total';
            }
            return params.indexRelativeToCurrentPage % 2 === 0 ? 'dataGrid-row-even' : 'dataGrid-row-odd';
          }}
          getRowHeight={(params) => {
            if (params.id === 'totalsRow') {
              return 48;
            }
          }}
          hideFooter
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns
                average: false,
                details: false,
                total: false,
              },
            },
          }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          processRowUpdate={processRowUpdate}
          rowHeight={28}
          rowModesModel={rowModesModel}
          rows={rows}
          sx={styleProps}
          experimentalFeatures={{ newEditingApi: true }}
        />
      ) : (
        <div className='title-text-color bottom-padding-48 top-padding-12'>
          {`Oh no! Error loading the data. Laura is sorry. But maybe a refresh will fix it?`}
        </div>
      )}
    </div>
  );
}

export default SummaryTotalsTable;