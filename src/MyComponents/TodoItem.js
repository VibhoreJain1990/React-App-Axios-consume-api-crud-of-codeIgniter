import React from 'react'

//javascript destructuring concept is used in below line.. instead of props for learning purpose. 
export const TodoItem = ({todo,onDelete}) => {
  return (
    <>
    <div>
      <h4>{todo.title}</h4>
      <p>{todo.desc}</p>
      <button className="btn btn-danger btn-sm" onClick={()=>{onDelete(todo)}} >Delete</button>
      
    </div>
    <hr/>
    </>
  )
}
