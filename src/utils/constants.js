export const getVariance = (budget, total) => budget - total;

export const totalsByCategory = {
  transportation: {
    budget: 0,
    total: 0,
  },
  dining: {
    budget: 0,
    total: 0,
  },
  entertainment: {
    budget: 0,
    total: 0,
  },
  gifts: {
    budget: 0,
    total: 0,
  },
  clothes: {
    budget: 0,
    total: 0,
  },
  toiletries: {
    budget: 0,
    total: 0,
  },
}

export const totalsByMonthAndCategory = {
  yearTotal: 0,
  yearBudget: 0,
  0: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  1: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  2: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  3: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  4: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  5: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  6: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  7: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  8: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  9: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  10: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  11: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
  11: {
    monthTotal: 0,
    monthBudget: 0,
    transportation: {},
    dining: {},
    entertainment: {},
    gifts: {},
    clothes: {},
    toiletries: {},
  },
}

// export const categories = {
//   transportation: [],
//   dining: [],
//   entertainment: [],
//   gifts: [],
//   clothes: [],
//   toiletries: []
// }

export const categories = [
  'clothes',
  'dining',
  'entertainment',
  'gifts',
  'toiletries',
  'transportation',
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

export const expenses = [];

export const expensesByCategoryAndMonth = [
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '1/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '1/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '1/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '1/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '1/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '1/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '1/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '1/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '1/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '1/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '1/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '1/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '1/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '1/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '1/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '1/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '1/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '1/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '2/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '2/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '2/25/23',
          amount: 575,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '2/1/23',
          amount: 448,
        },
        {
          description: 'another',
          date: '2/4/23',
          amount: 55,
        },
        {
          description: 'an expense',
          date: '2/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '2/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '2/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '2/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '2/1/23',
          amount: 84
        },
        {
          description: 'another',
          date: '2/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '2/25/23',
          amount: 1300,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '2/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '2/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '2/25/23',
          amount: 557,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '2/1/23',
          amount: 4,
        },
        {
          description: 'another',
          date: '2/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '2/25/23',
          amount: 4,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '3/1/23',
          amount: 4
        },
        {
          description: 'another',
          date: '3/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '3/25/23',
          amount: 7,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '3/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '3/4/23',
          amount: 567,
        },
        {
          description: 'an expense',
          date: '3/25/23',
          amount: 8,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '3/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '3/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '3/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '3/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '3/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '3/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '3/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '3/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '3/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '3/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '3/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '3/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '4/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '4/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '4/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '4/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '4/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '4/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '4/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '4/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '4/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '4/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '4/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '4/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '4/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '4/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '4/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '4/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '4/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '4/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '5/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '5/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '5/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '5/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '5/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '5/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '5/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '5/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '5/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '5/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '5/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '5/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '5/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '5/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '5/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '5/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '5/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '5/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '6/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '6/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '6/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '6/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '6/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '6/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '6/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '6/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '6/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '6/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '6/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '6/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '6/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '6/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '6/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '6/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '6/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '6/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '7/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '7/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '7/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '7/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '7/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '7/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '7/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '7/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '7/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '7/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '7/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '7/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '7/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '7/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '7/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '7/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '7/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '7/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '8/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '8/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '8/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '8/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '8/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '8/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '8/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '8/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '8/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '8/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '8/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '8/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '8/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '8/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '8/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '8/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '8/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '8/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '9/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '9/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '9/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '9/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '9/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '9/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '9/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '9/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '9/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '9/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '9/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '9/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '9/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '9/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '9/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '9/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '9/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '9/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '10/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '10/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '10/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '10/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '10/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '10/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '10/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '10/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '10/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '10/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '10/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '10/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '10/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '10/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '10/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '10/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '10/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '10/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '11/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '11/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '11/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '11/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '11/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '11/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '11/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '11/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '11/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '11/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '11/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '11/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '11/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '11/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '11/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '11/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '11/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '11/25/23',
          amount: 74,
        }
      ],
    }
  },
  {
    transportation: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '12/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '12/4/23',
          amount: 98,
        },
        {
          description: 'an expense',
          date: '12/25/23',
          amount: 57,
        }
      ],
    },
    dining: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '12/1/23',
          amount: 48,
        },
        {
          description: 'another',
          date: '12/4/23',
          amount: 5,
        },
        {
          description: 'an expense',
          date: '12/25/23',
          amount: 78,
        }
      ],
    },
    entertainment: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '12/1/23',
          amount: 76,
        },
        {
          description: 'another',
          date: '12/4/23',
          amount: 15,
        },
        {
          description: 'an expense',
          date: '12/25/23',
          amount: 57,
        }
      ],
    },
    gifts: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '12/1/23',
          amount: 874
        },
        {
          description: 'another',
          date: '12/4/23',
          amount: 68,
        },
        {
          description: 'an expense',
          date: '12/25/23',
          amount: 100,
        }
      ],
    },
    clothes: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '12/1/23',
          amount: 8654,
        },
        {
          description: 'another',
          date: '12/4/23',
          amount: 45,
        },
        {
          description: 'an expense',
          date: '12/25/23',
          amount: 57,
        }
      ],
    },
    toiletries: {
      budget: 0,
      total: 0,
      expenses: [
        {
          description: 'one thing',
          date: '12/1/23',
          amount: 34,
        },
        {
          description: 'another',
          date: '12/4/23',
          amount: 8,
        },
        {
          description: 'an expense',
          date: '12/25/23',
          amount: 74,
        }
      ],
    }
  },
]

