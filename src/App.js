import './App.css';
import Header from './MyComponents/Header.js';
import { Todos } from './MyComponents/Todos.js';
import { Footer } from './MyComponents/Footer.js';
import { AddTodo } from './MyComponents/AddTodo.js';
import { useState, useEffect } from 'react';
import { About } from './MyComponents/About.js';
//import { MyComponent } from './MyComponents/Mycomponentvj.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MyComponent from './MyComponents/Mycomponentvj.js';
import Game from './MyComponents/Tictactoe.js';
import Search_list from './MyComponents/Search_list.js';
import FetchApi from './MyComponents/Fetch_fake_api.js';
import AxiosFakeApiCall from './MyComponents/Axios_vjApi.js';
import Todos_ci4 from './MyComponents/todos_axios_ci4.js';

//import './MyComponents/footer.css';//this way also we can add css

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = []
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    //console.log("I am on delete of todo", todo);
    //deleting this way in react does not work 
    //let index=todos.indexOf(todo);
    //todos.splice(index,1);//normal js to delete current todo element. 
    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
    // localStorage.getItem("todos");
  }

  const addTodo = (title, desc) => {
    //console.log("I am adding ",title,desc);
    let sno;
    if (todos.length === 0) {
      sno = 1;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = { sno: sno, title: title, desc: desc };
    console.log(myTodo);
    setTodos([...todos, myTodo]);

  }
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  
  return (
    <>
    <Router>
      <Header title="My Todos List" searchBar={false} />
      <Routes>
        <Route path="/" element={ // Use `element` instead of `render`
          <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
          </>
        } />
        <Route path="/about" element={ // Use `element` instead of `render`
         <About/>
        } />
        <Route path="/myfetchform" element={ // Use `element` instead of `render`
         <MyComponent/>
        } />
        <Route path="/tictactoe" element={ // Use `element` instead of `render`
         <Game/>
        } />
        <Route path="/searchlist" element={ // Use `element` instead of `render`
         <Search_list/>
        } />
        <Route path="/fetchFakeApi" element={ // Use `element` instead of `render`
         <FetchApi/>
        } />
        <Route path="/axiosFakeApi" element={ // Use `element` instead of `render`
         <AxiosFakeApiCall/>
        } />
        <Route path="/todos_get" element={ // Use `element` instead of `render`
         <Todos_ci4/>
        } />
      </Routes>     
      <Footer />
    </Router>
    </>
  );
}

export default App;
