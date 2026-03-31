import React from 'react'
import TodoItem from "../MyComponents/TodoItem.js";

const Todos = (props) => {// here we accept parameters called props from function
  return (
    <div className="container">
      <h3 className="my-3">Todos List</h3>
      {/* props.todos */}
      { props.todos.length===0? "No todos to display" : props.todos.map((todo)=> {
            return <TodoItem todo={todo} key ={props.sno} onDelete= {props.onDelete}/>
        })
      }

      {/* Take in a function as param inside map fn where todo is each element of todo 
      and map each element of todo to the desire output of the function and return the o/p concatenated as array onlu*/}
     
    </div>
  )
}

export default Todos
