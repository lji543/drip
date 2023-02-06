import React, { useState } from 'react';

import { Button, MenuItem, Select, TextField } from '@mui/material';

import { categories, statusMessages } from '../../utils/ericConstants';
import useExpenses from '../../state/useExpenses';
import { convertToInt, formatDate } from '../../utils/utilFunctions';

const baseItemObj = {
  amount: '',
  category: '',
  date: '',
  details: '',
  name: '',
};

const NewItemForm = ({ props }) => { // TODO: maybe make this a modal for the tracking page at least
  const { addNewRow, category, className, itemCategoryName, itemObj = baseItemObj, setIsAddingItems } = props;
  const { totalsByCategory } = useExpenses();
  const [newItem, setNewItem] = useState(itemObj);
  const [statusMessage, setStatusMessage] = useState('');

  // console.log('NewItemForm ',totalsByCategory)

  const handleFieldChange = (event) => {
    const { id, name, value } = event.target;
    console.log('handleFieldChange ',id, value)
    // console.log('handleFieldChange ',event.target)
    if (name === 'category' || id === 'category') { // TODO: this is a workaround as select doesnt send up the id?
      setNewItem({
        ...newItem,
        [name]: value,
      });
    } else {
      setNewItem({
        ...newItem,
        [id]: value,
      });
    }
  };

  const handleItemUpdate = (action) => {
    // console.log('handleItemUpdate ',newItem)
    if (action !== 'cancel') {
      const { amount, category, date, details, name } = newItem;

      if (!amount || !date || !details || !name || !category) {
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
          setIsAddingItems(false);
        };
      }
    } else {
      setIsAddingItems(false);
    };
  };

  return (
    <div  className={`form${className ? ` ${className}` : ''}`}>
      <div className='form-title'>
        {`Add item to ${itemCategoryName}:`}
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
          className='right-spacing-12'
          value={newItem.amount}
        />
        <Select  sx={{ m: 1, minWidth: 120 }}
          required
          size="small"
          id="category"
          // label="Category"
          name="category"
          onChange={handleFieldChange}
          value={newItem.category}
        >
          {categories.map((cat) => <MenuItem key={cat} value={cat}>{totalsByCategory[cat].name}</MenuItem>)}
        </Select>
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
//         setIsAddingItems(false);
//       };
//     }
//   } else {
//     setIsAddingItems(false);
//   };
// };