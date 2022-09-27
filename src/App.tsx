import React, { useState, startTransition, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/index.scss'
import Button, { ButtonType, ButtonSize } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button onClick={(e) => { e.preventDefault();alert('123 ')}}> hello </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled={true}> hello </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled={true}> hello </Button>
    </div>
  );
}

export default App;
