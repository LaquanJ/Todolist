import './App.css';
import Header from '@components/Header';
import React from 'react';
import Home from '@views/Home.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
