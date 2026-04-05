import React from 'react';

export const getTodoById = (allTodos, id) => allTodos.find(t => t.sno === id);

export const buildPrereqChains = (currentTodo, allTodos, visited = new Set()) => {
  if (visited.has(currentTodo.sno)) return [[currentTodo]];

  const nextTodos = (currentTodo.prereqs || [])
    .map(id => getTodoById(allTodos, id))
    .filter(Boolean)
    .filter(t => !visited.has(t.sno));

  if (nextTodos.length === 0) return [[currentTodo]];

  const nextVisited = new Set(visited);
  nextVisited.add(currentTodo.sno);

  return nextTodos.flatMap(prereq =>
    buildPrereqChains(prereq, allTodos, new Set(nextVisited)).map(chain => [...chain, currentTodo])
  );
};

export const buildDependentChains = (currentTodo, allTodos, visited = new Set()) => {
  if (visited.has(currentTodo.sno)) return [[currentTodo]];

  const nextTodos = allTodos
    .filter(t => (t.prereqs || []).includes(currentTodo.sno))
    .filter(t => !visited.has(t.sno));

  if (nextTodos.length === 0) return [[currentTodo]];

  const nextVisited = new Set(visited);
  nextVisited.add(currentTodo.sno);

  return nextTodos.flatMap(dependent =>
    buildDependentChains(dependent, allTodos, new Set(nextVisited)).map(chain => [currentTodo, ...chain])
  );
};

export const GraphSection = ({ title, chains, currentTodoId }) => (
  <div className="dependency-section">
    <h6>{title}</h6>
    {chains.map((chain, index) => (
      <GraphChain key={`${chain[0].sno}-${index}`} chain={chain} currentTodoId={currentTodoId} />
    ))}
  </div>
);

export const GraphChain = ({ chain, currentTodoId }) => (
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
