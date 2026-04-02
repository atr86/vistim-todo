import React, { useState, useEffect } from 'react'
import './TodoItem.css'

const TodoItem = ({ todo, onDelete, calculateTimeRemaining }) => {
  const [timeLeft, setTimeLeft] = useState({ text: 'N/A', ms: 0 });

  // Helper function to display date in formatted way (ddmmyyyy to dd/mm/yyyy)
  const formatDisplayDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const day = dateStr.substring(0, 2);
    const month = dateStr.substring(2, 4);
    const year = dateStr.substring(4, 8);
    return `${day}/${month}/${year}`;
  };

  // Update time remaining every second
  useEffect(() => {
    const updateTimeLeft = () => {
      const result = calculateTimeRemaining(todo.timeTargetDate, todo.timeTargetTime);
      setTimeLeft(result);
    };

    updateTimeLeft(); // Set initial value
    const interval = setInterval(updateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [todo.timeTargetDate, todo.timeTargetTime, calculateTimeRemaining]);

  // Determine color based on time remaining
  const getStatusColor = () => {
    const ms = timeLeft.ms;
    const hours = ms / (1000 * 60 * 60);
    
    if (ms <= 0) return 'danger'; // Overdue - red
    if (hours < 1) return 'warning'; // Less than 1 hour - orange
    if (hours < 24) return 'info'; // Less than 24 hours - blue
    return 'secondary'; // More than 24 hours - gray
  };

  return (
    <div className="todo-item-container">
      <h4>{todo.title}</h4>
      <p>{todo.desc}</p>
      {todo.timeTargetDate && todo.timeTargetTime && (
        <div className="time-target-info">
          <small>
            📅 Target: {formatDisplayDate(todo.timeTargetDate)} at {todo.timeTargetTime}
          </small>
          <small className={`badge bg-${getStatusColor()}`}>
            ⏱️ {timeLeft.text}
          </small>
        </div>
      )}
      <div className="todo-actions">
        <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem