# Visual Timed Todo

A React-based task management application that helps you organize and prioritize your todos with time targets and dependency management. Features intelligent task ordering using topological sorting to suggest the optimal completion sequence based on prerequisites and deadlines.

## Features

- **Time-Targeted Tasks**: Set specific dates and times for task completion
- **Dependency Management**: Create prerequisites between tasks to ensure proper sequencing
- **Dependency Graph Visualization**: View task dependency chains with directed graphs showing both prerequisites and dependents
- **Smart Ordering**: Automatic topological sorting suggests the best order to complete tasks
- **Cycle Detection**: Prevents circular dependencies that would make tasks impossible to complete
- **Persistent Storage**: Tasks are saved locally in your browser
- **Task Status Tracking**: Mark tasks as pending or completed
- **Responsive Design**: Clean, modern interface that works on all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/atr86/vistim-todo.git
cd vistim-todo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Adding a Todo

1. Click on the "Add a Todo" section
2. Fill in the task title and description
3. Set the target date and time for completion
4. (Optional) Select prerequisite tasks that must be completed first
5. Click "Add Todo" to save

### Managing Dependencies

- When adding a todo, you can select other pending todos as prerequisites
- The app will automatically suggest the optimal completion order
- Use the dependency graph modal to visualize task chains with arrows showing prerequisites and dependent tasks
- If you create circular dependencies, you'll see a warning message

### Completing Tasks

- Click the checkbox next to a todo to mark it as completed
- Completed tasks are visually distinguished and removed from dependency calculations

## Project Structure

```
src/
├── App.js                 # Main application component
├── App.css               # Application styles
├── index.js              # Application entry point
├── MyComponents/
│   ├── Header.js         # Application header
│   ├── Footer.js         # Application footer
│   ├── AddTodo.js        # Todo creation form
│   ├── Todos.js          # Todo list display
│   ├── TodoItem.js       # Individual todo component
│   ├── About.js          # About page
│   ├── dependencyGraph.js# Dependency graph rendering and helpers
│   └── todoGraph.js      # Topological sorting logic
└── ...
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## Technologies Used

- **React** - Frontend framework
- **React Router** - Client-side routing
- **Bootstrap** - CSS framework for styling
- **Local Storage** - Data persistence
- **Topological Sorting** - Task ordering algorithm

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Create React App
- Uses topological sorting for intelligent task ordering
- Inspired by modern task management applications

