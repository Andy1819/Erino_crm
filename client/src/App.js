import React from 'react';
import Header from './components/Header';
import ContactsTable from './components/ContactsTable';
import './styles/app.css';

function App() {
  return (
    <div className="app">
      <Header />
      <ContactsTable />
    </div>
  );
}

export default App;
