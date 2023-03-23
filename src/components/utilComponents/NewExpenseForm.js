import React, { useState } from 'react';

import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

import { baseExpenseSchema, statusMessages } from '../../utils/ericConstants';
import { convertToInt, formatDate } from '../../utils/utilFunctions';

const NewExpenseForm = ({ props }) => { // TODO: maybe make this a modal for the tracking page at least
  const { addNewRow, category, className, itemCategoryName, itemObj = baseExpenseSchema, setIsAddingExpense } = props;
  const [isMonthly, setIsMonthly] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [newItem, setNewItem] = useState(itemObj);
  const [statusMessage, setStatusMessage] = useState('');

  // console.log('NewItemForm ',props)

  const handleFieldChange = (event) => {
    const { id, value } = event.target;

    if (statusMessage) {
      setStatusMessage();
    }
    if (id === 'isMonthly') {
      const newIsYearly = false;
      if (isMonthly === false && isYearly === true) {
        setIsYearly(newIsYearly);
      }
      setIsMonthly(!isMonthly);
      setNewItem({
        ...newItem,
        isYearly: newIsYearly,
        [id]: !isMonthly,
      });
    } else if (id === 'isYearly') {
      const newIsMonthly = false;
      if (isYearly === false && isMonthly === true) {
        setIsMonthly(newIsMonthly);
      }
      setIsYearly(!isYearly);
      setNewItem({
        ...newItem,
        isMonthly: newIsMonthly,
        [id]: !isYearly,
      });
    } else {
      setNewItem({
        ...newItem,
        [id]: value,
      });
    }
  };

  const handleExpenseUpdate = (action) => {
    if (action !== 'cancel') {
      const { amount, date, name } = newItem;
      if (!amount || !date || !name) {
      // if (!amount || !date || !details) {
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
        setIsMonthly(false);
        setIsYearly(false);
    
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
      <div></div>
      <div className='form-row'>
        <TextField
          required
          size="small"
          id="date"
          type="date"
          onChange={handleFieldChange}
          value={newItem.date}
          className='right-margin-12'
        />
        <TextField
          required
          size="small"
          id="name"
          label="Description"
          onChange={handleFieldChange}
          className='right-margin-12'
          value={newItem.name}
        />
        <TextField
          size="small"
          id="details"
          label="Details"
          onChange={handleFieldChange}
          className='right-margin-12'
          value={newItem.details}
        />
        <TextField
          required
          size="small"
          id="amount"
          label="Amount"
          type="number"
          onChange={handleFieldChange}
          className='right-margin-12'
          value={newItem.amount}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox id="isMonthly" size="small" checked={isMonthly} onChange={handleFieldChange} />} label="Monthly" />
          {/* <FormControlLabel control={<Checkbox id="isYearly" size="small" checked={isYearly} onChange={handleFieldChange}  />}  label="Yearly" /> */}
        </FormGroup>
      </div>
      {<div className='form-error'>
        {statusMessage}
      </div>}
      <div className='actions-row'>
        <Button
          className='button-outlined right-margin-12'
          onClick={() => handleExpenseUpdate('close')}
        >
          Save and Close
        </Button>
        <Button
          className='button-outlined right-margin-12'
          onClick={() => handleExpenseUpdate()}
        >
          Save and Add Another
        </Button>
        <Button
          className='button-outlined'
          onClick={() => handleExpenseUpdate('cancel')}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
} 

export default NewExpenseForm;