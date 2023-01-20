import React, { useContext, useState } from 'react';

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { BudgetContext } from '../BudgetContext';
import { categories, expenses } from '../utils/constants';

const defaultDate = new Date();

const NewExpense = ({hideShowExpenseForm, showExpenseForm, testExpenses}) => {
  const [state, setState] = useContext(BudgetContext);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(defaultDate.getDate());
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [catTotals, setCatTotals] = useState(categories);

  // defaultDate.setDate(defaultDate.getDate());
  // const [newExpense, setNewExpense] = useState({
  //   amount: 0,
  //   description: '',
  //   category: ''
  // });
  // console.log('hideShowExpenseForm: ', hideShowExpenseForm)
  // console.log('New Expense Date ',date)

  const handleDateChange = (event) => {
    setDate(event.target.value);
  }
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  const handleExpenseUpdate = () => { ///// TODO
  //   setNewExpense({
  //     amount: amount,
  //     description: description,
  //     category: category
  //   });
    // TODO send this expense somewhere
    const newExpense = {
      amount: amount, // TODO change to number
      date: date,
      description: description,
      // category: category,
      category: 'dining'
    }
    // expenses.push(newExpense);
    console.log('imported: ', expenses)
    testExpenses.push(newExpense);

    console.log('New Expense: ', newExpense)
    console.log('showExpenseForm: ', showExpenseForm)
    if (showExpenseForm) {
      setAmount('');
      setDate('');
      setDescription('');
      setCategory('');
    }
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {/* <div>
        <TextField
          required
          id="outlined-required"
          label="date"
          type="date"
          onChange={handleDateChange}
          value={date}
        />
      </div> */}
      <div>
        <TextField
          required
          id="outlined-required"
          label="Description"
          onChange={handleDescriptionChange}
          value={description}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Amount"
          type="number"
          onChange={handleAmountChange}
          value={amount}
        />
      </div>
      {/* <FormControl fullWidth> */}
      {/* <div>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          className="select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          onChange={handleCategoryChange}
          value={category}
        >
          {Object.keys(categories).map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
        </Select> */}
        {/* </FormControl> */}
      {/* </div> */}
      <div>
        <Button onClick={handleExpenseUpdate && hideShowExpenseForm}>Save and Close</Button>
        <Button onClick={handleExpenseUpdate}>Save and Add Another</Button>
        <Button onClick={() => setState(state => ({ ...state, name: 'Clicked!' }))}>
          {state.name}
        </Button>
      </div>

      <div>TEST NEW Exp:</div>
      <div>
        {testExpenses.map(exp => {
          return (
            <div key={exp.amount + exp.desc + exp.date}>{exp.description} {exp.amount}</div>
          )
        })}
      </div>
    </Box>
  );
} 

export default NewExpense;