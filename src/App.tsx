import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/main';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Route component={Main} path="/" exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
