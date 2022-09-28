import React, { useState, startTransition, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/index.scss'
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <Button onClick={(e) => { e.preventDefault();alert('123 ')}}> hello </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled={true}> hello </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled={true}> hello </Button>
      <Menu defaultIndex={0} onSelect={(index) => { alert(index) }}>
        <MenuItem index={0} >link1</MenuItem>
        <MenuItem index={1} disabled>link2</MenuItem>
        <MenuItem index={2}>link3</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
