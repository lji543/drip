// TODO: combine this and AddNewItem component
import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

import NewExpenseForm from './NewExpenseForm';

// import { categories, months, statusMessages } from '../utils/ericConstants';

const AddNewExpense = (props) => { // Category tabs, with months as child
  // console.log('AddNewExpense ', props)
  const { isAddingExpense, setIsAddingExpense } = props;

  return (
    <div className='button-container'>
      {isAddingExpense ? (
        <NewExpenseForm props={props} />
      ) : (
        <Button
          className='button top-margin-12'
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

export default AddNewExpense;