import React from 'react'
import TodoItem from "../MyComponents/TodoItem.js";

// Helper function to convert ddmmyyyy and hhmmss to Date object
const parseTodoDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null;
  // dateStr format: ddmmyyyy, timeStr format: hh:mm:ss
  const day = dateStr.substring(0, 2);
  const month = dateStr.substring(2, 4);
  const year = dateStr.substring(4, 8);
  const [hours, minutes, seconds] = timeStr.split(':');
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
};

// Helper function to calculate time remaining and format it
const calculateTimeRemaining = (targetDate, targetTime) => {
  const targetDateTime = parseTodoDateTime(targetDate, targetTime);
  if (!targetDateTime) return { text: 'N/A', ms: 0 };
  
  const now = new Date();
  const diffMs = targetDateTime - now;
  
  if (diffMs <= 0) return { text: '⏱️ Overdue!', ms: diffMs };
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  // Display in largest applicable unit
  if (diffDays > 0) {
    return { text: `${diffDays}d ${diffHours}h left`, ms: diffMs };
  } else if (diffHours > 0) {
    return { text: `${diffHours}h ${diffMinutes}m left`, ms: diffMs };
  } else if (diffMinutes > 0) {
    return { text: `${diffMinutes}m ${diffSeconds}s left`, ms: diffMs };
  } else {
    return { text: `${diffSeconds}s left`, ms: diffMs };
  }
};

const Todos = (props) => {// here we accept parameters called props from function
   //console.log('Value of props.todos:', props.todos);
  //console.log('Type of props.todos:', typeof props.todos);
  
  // Sort todos by time remaining (ascending - urgent ones first)
  const sortedTodos = [...props.todos].sort((a, b) => {
    const timeA = calculateTimeRemaining(a.timeTargetDate, a.timeTargetTime);
    const timeB = calculateTimeRemaining(b.timeTargetDate, b.timeTargetTime);
    return timeA.ms - timeB.ms; // Earlier deadlines first
  });
  
  let myStyle={
    minHeight: "70 vh",
    margin: "40 px auto"
  }

  const todoMap = new Map(props.todos.map(t => [t.sno, t]));

  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Todos List</h3>
      {!Array.isArray(sortedTodos) || sortedTodos.length === 0 ? "No todos to display" : 
          sortedTodos.map((todo) => {
            const blocked = (todo.prereqs || []).some(id => todoMap.get(id)?.status !== 'done');
            const prereqTitles = (todo.prereqs || []).map(id => todoMap.get(id)?.title || `#${id}`).filter(Boolean);
            return (
                  <TodoItem
                    todo={todo}
                    key={todo.sno}
                    onDelete={props.onDelete}
                    calculateTimeRemaining={calculateTimeRemaining}
                    onToggleDone={props.onToggleDone}
                    blocked={blocked}
                    prereqTitles={prereqTitles}
                  />
        )
      })
      }

      {/* Take in a function as param inside map fn where todo is each element of todo 
      and map each element of todo to the desire output of the function and return the o/p 
      concatenated as array only*/}

    </div>
  )
}

export default Todos

Todos.defaultProps = {
  todos: []
}
