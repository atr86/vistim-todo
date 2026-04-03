// Utility functions for task dependency graph (DAG) and topological sorting

export function topoSortTodos(todos) {
  const allIds = todos.map(todo => todo.sno);
  const indegree = new Map(allIds.map(id => [id, 0]));
  const adj = new Map(allIds.map(id => [id, []]));

  for (const todo of todos) {
    for (const prereqId of (todo.prereqs || [])) {
      if (!adj.has(prereqId)) continue;
      adj.get(prereqId).push(todo.sno);
      indegree.set(todo.sno, (indegree.get(todo.sno) || 0) + 1);
    }
  }

  const queue = [];
  for (const id of allIds) {
    if (indegree.get(id) === 0) queue.push(id);
  }

  const order = [];
  while (queue.length > 0) {
    const id = queue.shift();
    order.push(id);
    for (const next of (adj.get(id) || [])) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }

  const hasCycle = order.length !== todos.length;
  return { order, hasCycle };
}
