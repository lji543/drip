// TODO: combine this and AddNewExpense component
import React, { useEffect, useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

import NewItemForm from '../secondaryComponents/NewItemForm';

// import { categories, months, statusMessages } from '../utils/ericConstants';
import useExpenses from '../../state/useExpenses';

const AddNewItem = (props) => { // Category tabs, with months as child
  // console.log('AddNewItem ', props)
  const { isAddingExpense, setIsAddingExpense } = props;

  return (
    <div className='button-container'>
      {isAddingExpense ? (
        <NewItemForm props={props} />
      ) : (
        <Button
          className='button top-spacing-12'
          // color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddingExpense(!isAddingExpense)}
        >
          Add Expense
        </Button>
      )}
    </div>
  );
}

export default AddNewItem;