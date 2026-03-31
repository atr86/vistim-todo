import React from 'react'

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div>
      {/*align="center"*/}
      <h4 >{todo.title}</h4>
      <p>{todo.desc}</p>
      <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
      {/*function pass and not call... so not called at rendering otherwise*/}
    </div>
  )
}

export default TodoItem