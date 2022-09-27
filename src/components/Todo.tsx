import React from "react";
import fecthData from "../fetchData";
const data = fecthData('https://jsonplaceholder.typicode.com/todos/1')

const Todo: React.FC = () => {
  const todoData = data.read()
  return (
    <h1>{todoData.title}</h1>
  )
}

export default Todo