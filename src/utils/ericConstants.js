// TODO: move consistent expenses to different array or catalouge them differently?

export const statusMessages = {
  add: {
    success: 'Your expense has been added to ', // TODO: pass variables into these strings
    error: 'Your expense was not added. Please try again and report bug to Laura.'
  },
  delete: {
    success: 'Your expense has been deleted.',
    error: 'Your expense was not deleted. Please try again and report bug to Laura.'
  },
  update: {
    success: 'Your expense has been updated.',
    error: 'Your expense was not updated. Please try again and report bug to Laura.'
  },
  form: {
    requiredError: 'All fields are required.'
  },
  addowed: {
    success: 'Your item has been added to ',
    error: 'Your item was not added. Please try again and report bug to Laura.'
  },
  deleteowed: {
    success: 'Your item has been deleted.',
    error: 'Your item was not deleted. Please try again and report bug to Laura.'
  },
  updateowed: {
    success: 'Your item has been updated.',
    error: 'Your item was not updated. Please try again and report bug to Laura.'
  },
  login: {
    passwordError: 'Incorrect Password. Please try again or reset it.'
  }
  // expenseList: {
  //   noExpenses: 'There are no expenses for '
  // },
}

export const trackedExpenses = {
  totalOwedByEric: 55,
  totalOwedToEric: 30,
  owedByEric: [
    {
      amount: 55,
      category: '',
      date: '1/15/23',
      id: '3399edhjdakjbf',
      details: 'Mom Bday Gift',
      name: 'Laura always',
    }
  ],
  owedToEric: [
    {
      amount: 30,
      category: '',
      date: '1/5/23',
      id: '37g43fsjdakjbf',
      details: 'Dad Bday Gift',
      name: 'Laura always',
    }
  ],
  owedByEricDisabled: [
    {
      amount: 55,
      category: '',
      date: '1/15/23',
      deails: '',
      id: '339dhjdakaexcjbf',
      details: 'Mom Bday Gift',
      name: 'Andrew',
    }
  ],
  owedToEricDisabled: [
    {
      amount: 30,
      category: '',
      date: '1/5/23',
      id: '37gfsjdaaskjbf',
      details: 'Dad Bday Gift',
      name: 'Beth',
    }
  ]
}

export const expensesByCategoryAndMonth = [
  // JANUARY
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // FEBRUARY
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // MARCH
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // APRIL
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // MAY
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // JUNE
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // JULY
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // AUGUST
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // SEPTEMBER
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // OCTOBER
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // NOVEMBER
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
  // DECEMBER
  {
    autoIns: {
      expenses: [],
    },
    gas: {
      expenses: [],
    },
    homeIns: {
      expenses: [],
    },
    lifeIns: {
      expenses: [],
    },
    mortgage: {
      expenses: [],
    },
  },
]

export const categories = [ // In order matching original excel spreadsheet
  'autoIns',
  'homeIns',
  'lifeIns',
  'mortgage',
  'gasUtil',
  'hoa',
  'electric',
  'city',
  'internet',
  'security',
  'solar',
  'cell',
  'gas',
  'grocery',
  'dining',
  'other',
  'investments',
  'rothIRA',
  'rothTSP',
  'savings',
]

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const monthsFull = [ // TODO: kind of dumb to have this?
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]

export const totalsByCategoryAndMonth = {
  _yearTotal: 0,
  _yearBudget: 0,
  0: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  1: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  2: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  3: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  4: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  5: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  6: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  7: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  8: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  9: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  10: {
    _monthAverage: 0,
    _monthBudget: 0,
    _monthTotal: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
  11: {
    _monthTotal: 0,
    _monthBudget: 0,
    autoIns: 0,
    cell: 0,
    city: 0,
    dining: 0,
    electric: 0,
    gas: 0,
    gasUtil: 0,
    grocery: 0,
    homeIns: 0,
    hoa: 0,
    internet: 0,
    investments: 0,
    lifeIns: 0,
    mortgage: 0,
    other: 0,
    rothIRA: 0,
    rothTSP: 0,
    savings: 0,
    security: 0,
    solar: 0,
  },
}

export const yearTotalsByCategory = {
  _yearTotal: 0,
  _yearBudget: 0,
  autoIns: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Auto Insurance',
    total: 0,
  },
  cell: {
    budget: 0,
    details: 'Tmobile',
    monthlyAvg: 0,
    name: 'Cell',
    total: 0,
  },
  city: {
    budget: 0,
    details: 'N. Las Vegas',
    monthlyAvg: 0,
    name: 'City',
    total: 0,
  },
  dining: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Eating Out',
    total: 0,
  },
  electric: {
    budget: 0,
    details: 'NV Energy',
    monthlyAvg: 0,
    name: 'Electric',
    total: 0,
  },
  gas: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Gas',
    total: 0,
  },
  gasUtil: {
    budget: 0,
    details: 'SouthWest Gas',
    monthlyAvg: 0,
    name: 'Gas',
    total: 0,
  },
  grocery: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Grocery',
    total: 0,
  },
  homeIns: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Home Insurance',
    total: 0,
  },
  hoa: {
    budget: 0,
    details: 'Aliante Master',
    monthlyAvg: 0,
    name: 'HOA',
    total: 0,
  },
  internet: {
    budget: 0,
    details: 'Cox',
    monthlyAvg: 0,
    name: 'Internet',
    total: 0,
  },
  investments: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Investments',
    total: 0,
  },
  lifeIns: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Life Insurance',
    total: 0,
  },
  mortgage: {
    budget: 0,
    details: 'UWM, HOA/Republic',
    monthlyAvg: 0,
    name: 'Mortgage',
    total: 0,
  },
  other: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Other',
    total: 0,
  },
  rothIRA: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Roth IRA',
    total: 0,
  },
  rothTSP: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Roth TSP',
    total: 0,
  },
  savings: {
    budget: 0,
    details: '',
    monthlyAvg: 0,
    name: 'Savings',
    total: 0,
  },
  security: {
    budget: 0,
    details: 'Vivint, Fortiva',
    monthlyAvg: 0,
    name: 'Security',
    total: 0,
  },
  solar: {
    budget: 0,
    details: 'GoodLeap',
    monthlyAvg: 0,
    name: 'Solar',
    total: 0,
  },
}



///***/// EXPENSE/ITEM SCHEMAS ///***///
export const baseItemSchema = {
  amount: '',
  category: '',
  date: '',
  details: '',
  id: '',
  includedInExpenses: false,
  isPaid: false,
  name: '',
  owedToBy: '',
};

export const baseExpenseSchema = {
  amount: 0,
  category: '',
  date: '',
  details: '',
  id: '',
  isNew: false, // from DataGrid
  name: '',
}



// alphabetical
// export const categories = [ 
//   'autoIns',
//   'cell',
//   'city',
//   'dining',
//   'electric',
//   'gas',
//   'gasUtil',
//   'grocery',
//   'homeIns',
//   'hoa',
//   'internet',
//   'investments',
//   'lifeIns',
//   'mortgage',
//   'other',
//   'rothIRA',
//   'rothTSP',
//   'savings',
//   'security',
//   'solar',
// ]