import React, { useState } from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import categories from '../utils/constants';

const NewExpense = () => {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
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
      <div>
        <TextField
            required
            id="outlined-required"
            label="Description"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Amount"
          />
      </div>
      <div>
          <TextField
            required
            id="outlined-required"
            label="Amount"
          />
      </div>
      {/* <FormControl fullWidth> */}
      <div>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          className="select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {Object.keys(categories).map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
        </Select>
        {/* </FormControl> */}
      </div>
    </Box>
  );
} 

export default NewExpense;