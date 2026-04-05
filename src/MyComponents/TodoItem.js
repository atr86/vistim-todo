import React, { useState, useEffect } from 'react'
import './TodoItem.css'

const TodoItem = ({ todo, onDelete, onToggleDone, calculateTimeRemaining, blocked, prereqTitles, allTodos }) => {
  const [timeLeft, setTimeLeft] = useState({ text: 'N/A', ms: 0 });
  const [showDependencyModal, setShowDependencyModal] = useState(false);

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

  const statusBadgeClass = todo.status === 'done' ? 'success' : blocked ? 'warning' : 'primary';

  const getTodoById = (id) => allTodos.find(t => t.sno === id);

  const buildPrereqChains = (currentTodo, visited = new Set()) => {
    if (visited.has(currentTodo.sno)) return [[currentTodo]];
    const nextTodos = (currentTodo.prereqs || [])
      .map(getTodoById)
      .filter(Boolean)
      .filter(t => !visited.has(t.sno));

    if (nextTodos.length === 0) return [[currentTodo]];

    const nextVisited = new Set(visited);
    nextVisited.add(currentTodo.sno);

    return nextTodos.flatMap(prereq =>
      buildPrereqChains(prereq, new Set(nextVisited)).map(chain => [...chain, currentTodo])
    );
  };

  const buildDependentChains = (currentTodo, visited = new Set()) => {
    if (visited.has(currentTodo.sno)) return [[currentTodo]];
    const nextTodos = allTodos
      .filter(t => (t.prereqs || []).includes(currentTodo.sno))
      .filter(t => !visited.has(t.sno));

    if (nextTodos.length === 0) return [[currentTodo]];

    const nextVisited = new Set(visited);
    nextVisited.add(currentTodo.sno);

    return nextTodos.flatMap(dependent =>
      buildDependentChains(dependent, new Set(nextVisited)).map(chain => [currentTodo, ...chain])
    );
  };

  const dependencyChains = buildPrereqChains(todo).filter(chain => chain.length > 1);
  const dependentChains = buildDependentChains(todo).filter(chain => chain.length > 1);

  return (
    <>
      <div className="todo-item-container">
        <div className="todo-header">
          <h4>
            {todo.title}{' '}
            <span className={`badge bg-${statusBadgeClass}`}>
              {todo.status === 'done' ? 'Done' : blocked ? 'Blocked' : 'Ready'}
            </span>
          </h4>
          {(todo.prereqs && todo.prereqs.length > 0) && (
            <button
              className="btn btn-sm btn-outline-info dependency-btn"
              onClick={() => setShowDependencyModal(true)}
              title="View Dependencies"
            >
              🔗
            </button>
          )}
        </div>
        <p>{todo.desc}</p>
      {prereqTitles && prereqTitles.length > 0 && (
        <p>
          <small>🔗 Prereqs: {prereqTitles.join(', ')}</small>
        </p>
      )}
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
      <div className="todo-actions mt-2">
        <button
          className={`btn btn-sm ${todo.status === 'done' ? 'btn-secondary' : 'btn-success'} me-2`}
          onClick={() => onToggleDone(todo.sno)}
        >
          {todo.status === 'done' ? 'Mark Pending' : 'Mark Done'}
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => { onDelete(todo); }}>Delete</button>
      </div>
    </div>

    {/* Dependency Modal */}
    <div className={`modal fade ${showDependencyModal ? 'show' : ''}`} style={{ display: showDependencyModal ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Dependency Graph: {todo.title}</h5>
            <button type="button" className="btn-close" onClick={() => setShowDependencyModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="dependency-tree">
              {dependencyChains.length > 0 && (
                <GraphSection title="Depends on" chains={dependencyChains} currentTodoId={todo.sno} />
              )}
              {dependentChains.length > 0 && (
                <GraphSection title="Depended on by" chains={dependentChains} currentTodoId={todo.sno} />
              )}
              {dependencyChains.length === 0 && dependentChains.length === 0 && (
                <p className="text-muted">No dependencies or dependent tasks found.</p>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowDependencyModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
    {showDependencyModal && <div className="modal-backdrop fade show" onClick={() => setShowDependencyModal(false)}></div>}
    </>
  )
}

const GraphSection = ({ title, chains, currentTodoId }) => {
  return (
    <div className="dependency-section">
      <h6>{title}</h6>
      {chains.map((chain, index) => (
        <GraphChain key={`${chain[0].sno}-${index}`} chain={chain} currentTodoId={currentTodoId} />
      ))}
    </div>
  );
};

const GraphChain = ({ chain, currentTodoId }) => {
  return (
    <div className="dependency-chain">
      {chain.map((node, idx) => (
        <React.Fragment key={`${node.sno}-${idx}`}>
          <div className={`dependency-node ${node.sno === currentTodoId ? 'current-node' : ''}`}>
            <span className={`badge bg-${node.status === 'done' ? 'success' : 'secondary'}`}>
              {node.status === 'done' ? '✓' : '○'} {node.title}
            </span>
          </div>
          {idx < chain.length - 1 && <span className="graph-arrow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TodoItem