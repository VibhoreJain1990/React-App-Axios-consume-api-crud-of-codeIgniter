import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user_login', {
        email: username,
        password: password,
      });

      // Destructure access_token from response.data
      const { access_token } = response.data;
      localStorage.setItem('jwtToken', access_token);

      // Redirect to the desired page after successful login
      navigate('/todos_get'); // Change the route if needed

    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container" style={{"width":"600px","margin-left":"100px","margin-top":"10px"}}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} aria-describedby="emailHelp" required placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required placeholder="Password"/>
  </div>
        <br/>
        <button type="submit" className='btn btn-primary'>Login</button>
        {error && <p className="error-message" style={{"color":"red"}}>*{error}</p>}
      </form>
    </div>
  );
};

export default Login;
