import React, { useState } from 'react';

import { Button, TextField } from '@mui/material';

import { statusMessages } from '../../utils/ericConstants';
import useExpenses from '../../state/useExpenses';
import { convertToInt, formatDate } from '../../utils/utilFunctions';

const baseItemObj = {
  amount: '',
  date: '',
  details: '',
  name: '',
};

const NewItemForm = ({ props }) => { // TODO: maybe make this a modal for the tracking page at least
  const { addNewRow, category, className, itemCategoryName, itemObj = baseItemObj, setIsAddingExpense } = props;
  const [newItem, setNewItem] = useState(itemObj);
  const [statusMessage, setStatusMessage] = useState('');

  // console.log('NewItemForm ',props)

  const handleFieldChange = (event) => {
    const { id, value } = event.target;

    setNewItem({
      ...newItem,
      [id]: value,
    });
  };

  const handleItemUpdate = (action) => {
    console.log('handleItemUpdate ',newItem)
    if (action !== 'cancel') {
      const { amount, date, details, name } = newItem;

      if (!amount || !date || !details || !name) {
        setNewItem(itemObj);
        setStatusMessage(statusMessages.form.requiredError);
      } else {
        const newExp = {
          ...newItem,
          amount: convertToInt(newItem.amount),
          date: formatDate(newItem.date),
          id: `${newItem.amount}${Math.round(Math.random()*1000000)}`,
        }
    
        addNewRow(newExp, category);
        setNewItem(itemObj);
    
        if (action === 'close') {
          setIsAddingExpense(false);
        };
      }
    } else {
      setIsAddingExpense(false);
    };
  };

  return (
    <div  className={`form${className ? ` ${className}` : ''}`}>
      <div className='form-title'>
        {`Add expense to ${itemCategoryName}:`}
      </div>
      <div className='form-row'>
        <TextField
          required
          size="small"
          id="date"
          type="date"
          onChange={handleFieldChange}
          value={newItem.date}
          className='right-spacing-12'
        />
        <TextField
          required
          size="small"
          id="details"
          label="Details"
          onChange={handleFieldChange}
          className='right-spacing-12'
          value={newItem.details}
        />
        <TextField
          required
          size="small"
          id="name"
          label="Name"
          onChange={handleFieldChange}
          className='right-spacing-12'
          value={newItem.name}
        />
        <TextField
          required
          size="small"
          id="amount"
          label="Amount"
          type="number"
          onChange={handleFieldChange}
          value={newItem.amount}
        />
      </div>
      {<div className='form-error'>
        {statusMessage}
      </div>}
      <div className='actions-row'>
        <Button
          className='button-outlined right-spacing-12'
          onClick={() => handleItemUpdate('close')}
        >
          Save and Close
        </Button>
        <Button
          className='button-outlined right-spacing-12'
          onClick={() => handleItemUpdate()}
        >
          Save and Add Another
        </Button>
        <Button
          className='button-outlined'
          onClick={() => handleItemUpdate('cancel')}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
} 

export default NewItemForm;



// const handleItemUpdate = (action) => {
//   if (action !== 'cancel') {
//     const { amount, date, description, name } = newItem;
//     if (!amount || !date || !description || !name) {
//       setNewItem(itemObj);
//       setStatusMessage(statusMessages.form.requiredError);
//     } else {
//       const newExp = {
//         ...newItem,
//         amount: convertToInt(newItem.amount),
//         date: formatDate(newItem.date),
//         id: `${newItem.amount}${Math.round(Math.random()*1000000)}`,
//       }
  
//       addNewRow(newExp, category);
//       setNewItem(itemObj);
  
//       if (action === 'close') {
//         setIsAddingExpense(false);
//       };
//     }
//   } else {
//     setIsAddingExpense(false);
//   };
// };