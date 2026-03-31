import { useState } from 'react';
import './App.css';
import Header from "./MyComponents/Header.js";
import Todos from "./MyComponents/Todos.js";
import Footer from "./MyComponents/Footer.js"
import AddTodo from "./MyComponents/AddTodo.js";


//const function here imported as {fn_name}

function App() {
  const onDelete = (todo)=>{
    console.log("I am ondelete of todo",todo);
    // Deleting wont occur this way, use state hooks
    // let ind=todos.indexOf(todo);
    // todos.splice(ind,1);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
  }
   const addTodo= (title,desc)=>{
      console.log("I am adding todo", title," with description ",desc);
      let sno= todos[todos.length-1].sno+1;
      const myTodo=
      {
        sno: sno,
        title:title,
        desc: desc
      }
      console.log(myTodo);
      setTodos([...todos,myTodo]);

   }
   const [todos, setTodos] = useState( [
    {
      sno: 1,
      title: "Go to Market",
      desc: "Buy Grocery"
    },
    {
      sno: 2,
      title: "Go to Mall",
      desc: "Buy Earphones"
    },
    {
      sno: 3,
      title: "Go to Medicine Shop",
      desc: "Buy Eno"
    },
  ])

  return (
    <>
    <Header title="My Todos List" searchbar={false}/>
    <AddTodo addTodo={addTodo}/>
    <Todos todos={todos} onDelete={onDelete}/>
    <Footer/>
    </>
    
  );
}

export default App;
