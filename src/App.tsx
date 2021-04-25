import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/main';

import './App.scss';
import DisplayPictures from './components/photos';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Route component={Main} path="/" exact />
        <Route component={DisplayPictures} path="/pictures" />
      </div>
    </BrowserRouter>
  );
}

export default App;
