import React from 'react';

import NewExpense from './components/NewExpense';
import TotalsTable from './components/TotalsTable';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <TotalsTable />
    </div>
  );
}

export default App;
