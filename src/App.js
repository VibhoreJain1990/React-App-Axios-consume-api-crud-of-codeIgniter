import './App.css';
import Header from './MyComponents/Header.js';
import { Todos } from './MyComponents/Todos.js';
import { Footer } from './MyComponents/Footer.js';
import { AddTodo } from './MyComponents/AddTodo.js';
import { useState, useEffect } from 'react';
import { About } from './MyComponents/About.js';
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
import Login from './MyComponents/Login.js';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Check if the token is expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('jwtToken'); // Optionally remove expired token
      //alert('if');
      return false;
    }

    return true;
  } catch (error) {
    // Handle decoding errors or invalid tokens
    console.error('Token decoding error:', error);
    //alert('catch');
    localStorage.removeItem('jwtToken'); // Optionally remove invalid token
    return false;
  }
};


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
        <Route path="/" element={
          <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/myfetchform" element={<MyComponent />} />
        <Route path="/tictactoe" element={<Game />} />
        <Route path="/searchlist" element={<Search_list />} />
        <Route path="/fetchFakeApi" element={<FetchApi />} />
        <Route path="/axiosFakeApi" element={<AxiosFakeApiCall />} />
        <Route path="/todos_get" element={
          <ProtectedRoute element={<Todos_ci4 />} />
        } />
        {/*<Route path="/todos_get" element={<Todos_ci4 />} />*/}
        <Route path="/login" element={<Login />} />
      </Routes>     
      <Footer />
    </Router>
    </>
  );
}

export default App;
