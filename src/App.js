import { useState, useEffect } from 'react';
import './App.css';
import Header from "./MyComponents/Header.js";
import Todos from "./MyComponents/Todos.js";
import Footer from "./MyComponents/Footer.js"
import AddTodo from "./MyComponents/AddTodo.js";
import About from "./MyComponents/About.js";
import {
  BrowserRouter as Router,
  Routes, // Replaced Switch with Routes
  Route
} from "react-router-dom";


//router- demostracte a component w/o pg reload
//const function here imported as {fn_name}

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("I am ondelete of todo",todo);
    // Deleting wont occur this way, use state hooks
    // let ind=todos.indexOf(todo);
    // todos.splice(ind,1);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    console.log("deleted", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  
  }
  const addTodo= (title,desc,timeTargetDate,timeTargetTime)=>{
      console.log("I am adding todo", title," with description ",desc," and timeTarget ",timeTargetDate, timeTargetTime);
      let sno;
      if(todos.length===0)
        sno=0;
      else
        sno= todos[todos.length-1].sno+1;
      
      const myTodo=
      {
        sno: sno,
        title:title,
        desc: desc,
        timeTargetDate: timeTargetDate,
        timeTargetTime: timeTargetTime
      }
      setTodos([...todos,myTodo]);
      console.log(myTodo);
   }
   
  const [todos, setTodos] = useState(initTodo); //must be declared at top - hooks

   // Update localStorage whenever todos changes
   useEffect(() => {
     localStorage.setItem("todos", JSON.stringify(todos));
   }, [todos])

  return (
    <> 
    <Router>
      <Header title="My Todos List" searchBar={false} /> 
      {/* Replaced Switch with Routes */}
      <Routes>
          {/* Replaced 'exact path' and 'render' with 'path' and 'element' */}
          <Route path="/" element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} /> 
            </>
          } /> 
          
          {/* Replaced child components with 'element' prop */}
          <Route path="/about" element={<About />} /> 
      </Routes> 
      <Footer />
    </Router>
    </>
  );
}

export default App;

// function App() {
//   // 1. Initialize State first
//   const [todos, setTodos] = useState(() => {
//     const saved = localStorage.getItem("todos");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // 2. Define functions after state
//   const onDelete = (todo) => {
//     setTodos(prevTodos => prevTodos.filter(e => e !== todo));
//   };

//   const addTodo = (title, desc) => {
//     const sno = todos.length === 0 ? 1 : todos[todos.length - 1].sno + 1;
//     const myTodo = { sno, title, desc };
    
//     setTodos(prevTodos => [...prevTodos, myTodo]);
//   };

//   // 3. Side effects
//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   return (
//     <>
//       <Header title="My Todos List" searchbar={false}/>
//       <AddTodo addTodo={addTodo}/>
//       <Todos todos={todos} onDelete={onDelete}/>
//       <Footer/>
//     </>
//   );
// }
// Ah, great question! So, the core issue is that the `setTodos` function from `useState` is
//  asynchronous—React batches state updates for performance reasons. So, when you call
//  `setTodos`, the state doesn’t instantly reflect the change in the very next line of your
//  code. Instead, the update is scheduled,
//  and React will re-render once that happens.

// Now, if you rely on the updated state immediately—like counting items or triggering 
//something right after—you might get stale or incorrect values. 
// That's why we often use `useEffect`. The `useEffect` hook runs after the render, so once
// the state update is complete, you can react to the new values. 
// In short, `useEffect` ensures that any logic depending on your updated state runs at the 
// right time—after the re-render—so the data is fresh and accurate. 
// Once you think of it like that, it helps keep your app's state logic consistent and
//  predictable.
