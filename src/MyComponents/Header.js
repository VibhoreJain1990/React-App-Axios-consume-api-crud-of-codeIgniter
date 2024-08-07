import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">{props.title}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/myfetchform">Fetch Form</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tictactoe">Tic Tac Toe</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/searchlist">Search List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/fetchFakeApi">Fetch Fake API</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/axiosFakeApi">Axios Fetch Fake API</Link>
          </li>          
          <li className="nav-item">
            <Link className="nav-link" to="/todos_get">Todos Axios CI4</Link>
          </li>          
        </ul>
        {props.searchBar? 
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>:""}
      </div>
    </div>
  </nav>
  )
}

//property types (prop types)below, for validating string or number. 
Header.propTypes = {
    title:PropTypes.string,
    //searchBar:PropTypes.bool.isRequired
}

//lets talk about default prop value. - if usesr will not pass the prop title ,
// then also it will take value from my default prop.
//Header.defaultProps={
  //  title:"vibhore is good",
    //searchBar:true
//} 
