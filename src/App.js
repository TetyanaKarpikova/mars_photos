import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <div >
        <Route component={Home} path='/' exact />              
      </div>
    </BrowserRouter>   
  );
}

export default App;
