import React, { useState, startTransition, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import LikeButton from './components/likeButtonUseRef';
import DogShow from './components/DogShow'
import Todo from './components/Todo'

interface IThemeProps {
  [key: string]: { color: string, background: string }
}
const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#ffffff'
  },
  'dark': {
    color: '#fff',
    background: '#ffffff'
  }
}
export const ThemeContext = React.createContext(themes.light)


function App() {
  // transition demo
  const [input, setInput] = useState('')
  const [searchData, setSearchData] = useState<number[]>([])
  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    startTransition(() => {
      const arr = Array.from({ length: 10000 }, (_, i) => new Date().getTime() + i)
      setSearchData(arr)
    })
  }

  return (
    <div className="App">
      <ThemeContext.Provider value={themes.light}>
        {/* <LikeButton></LikeButton> */}
        <input type="text" value={input} onChange={updateInput} />
        { searchData.map(d => 
          <option key={d}>{d}</option>
          )}

        <Suspense fallback={<h1>loading dog image...</h1>}>
          <DogShow />
        </Suspense>
        <Suspense fallback={<h1>loading todo data...</h1>}>
          <Todo />
        </Suspense>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
