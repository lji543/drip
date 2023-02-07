// TODO: combine this and AddNewExpense component
import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

import NewItemForm from './NewItemForm';

const AddNewItem = (props) => { // Category tabs, with months as child
  // console.log('AddNewItem ', props)
  const { isAddingItem, setIsAddingItem } = props;

  return (
    <div className='button-container'>
      {isAddingItem ? (
        <NewItemForm props={props} />
      ) : (
        <Button
          className='button top-margin-12'
          // color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddingItem(!isAddingItem)}
        >
          Add Another Item
        </Button>
      )}
    </div>
  );
}

export default AddNewItem;