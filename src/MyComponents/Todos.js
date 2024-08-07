import React from 'react'
import {TodoItem} from './TodoItem.js';

export const Todos = (props) => {
  let myStyle={
      minHeight:"100vh",
      margin:"40px auto"
  };
  // Reverse the todos array to show the latest ones on top
  const reversedTodos = [...props.todos].reverse();
  return (
    <div className="container my-3" style={myStyle}>
      <h3 className="text-center my-3">Todos List</h3>
      {reversedTodos.length>0 ?
      reversedTodos.map((todo) => {
      return (<TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} />)}
      ):"No Todos to display"}
    </div>
  )
}
