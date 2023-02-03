import React, { useRef, useState } from 'react';

import { Button, TextField } from '@mui/material';

import { statusMessages } from '../../utils/ericConstants';
import useExpenses from '../../state/useExpenses';
import { convertToInt, formatDate } from '../../utils/utilFunctions';

const baseExpenseObj = {
  amount: '',
  date: '',
  details: '',
};

const NewExpense = ({ addNewRow, category, month, setIsAddingExpense }) => {
  const { statusState, totalsByCategory } = useExpenses();
  const [newExpense, setNewExpense] = useState(baseExpenseObj);
  const [statusMessage, setStatusMessage] = useState('');

  const amountRef = useRef();
  const dateRef = useRef();
  const detailsRef = useRef();

  const handleFieldChange = (event) => {
    const { id, value } = event.target;

    setNewExpense({
      ...newExpense,
      [id]: value,
    });
  };

  const handleExpenseUpdate = (close) => {
    const { amount, date, details} = newExpense;
    if (!amount || !date || !details) {
      setNewExpense(baseExpenseObj);
      setStatusMessage(statusMessages.form.requiredError);
    } else {
      const newExp = {
        ...newExpense,
        amount: convertToInt(newExpense.amount),
        date: formatDate(newExpense.date),
        id: `${newExpense.amount}${Math.round(Math.random()*1000000)}`,
      }
  
      addNewRow(newExp);
      setNewExpense(baseExpenseObj);
  
      if (close) {
        setIsAddingExpense(false);
      };
    }
  };

  return (
    <div className='form'>
      <div className='form-title'>
        {`Add expense to ${totalsByCategory[category].name}:`}
      </div>
      <div className='form-row'>
        <TextField
          required
          size="small"
          id="date"
          type="date"
          onChange={handleFieldChange}
          value={newExpense.date}
          className='right-spacing-12'
        />
        <TextField
          required
          size="small"
          id="details"
          label="Description"
          onChange={handleFieldChange}
          className='right-spacing-12'
          value={newExpense.details}
        />
        <TextField
          required
          size="small"
          id="amount"
          label="Amount"
          type="number"
          onChange={handleFieldChange}
          value={newExpense.amount}
        />
      </div>
      {<div className='form-error'>
        {statusMessage}
      </div>}
      <div className='actions-row'>
        <Button
          className='button-outlined right-spacing-12'
          onClick={() => handleExpenseUpdate('close')}
        >
          Save and Close
        </Button>
        <Button
          className='button-outlined'
          onClick={() => handleExpenseUpdate()}
        >
          Save and Add Another
        </Button>
      </div>
    </div>
  );
} 

export default NewExpense;