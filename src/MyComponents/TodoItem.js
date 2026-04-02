import React from 'react'

const TodoItem = ({ todo, onDelete }) => {
  // Helper function to display date in formatted way (ddmmyyyy to dd/mm/yyyy)
  const formatDisplayDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const day = dateStr.substring(0, 2);
    const month = dateStr.substring(2, 4);
    const year = dateStr.substring(4, 8);
    return `${day}/${month}/${year}`;
  };

  return (
    <>
    <div>
      {/*align="center"*/}
      <h4 >{todo.title}</h4>
      <p>{todo.desc}</p>
      {todo.timeTargetDate && todo.timeTargetTime && (
        <div className="time-target-info">
          <small className="text-muted">
            ⏰ Target: {formatDisplayDate(todo.timeTargetDate)} at {todo.timeTargetTime}
          </small>
        </div>
      )}
      <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
      {/*function pass and not call... so not called at rendering otherwise*/}
    </div>
    <hr/>
    </>
  )
}

export default TodoItem