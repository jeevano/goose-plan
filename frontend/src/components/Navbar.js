import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import logo from '../logo.svg';

export default class Navbar extends React.Component {
  render() {
    return (
      
      <nav className="navbar navbar-expand-lg bg-dark">
        <Link to="/" className="navbar-brand text-white">
          goose-plan
        </Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link text-white">Planner</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link text-white">Login</Link>
          </li>
          <li className="navbar-item">
          <Link to="/signup" className="nav-link text-white">Signup</Link>
          </li>
        </ul>
        </div>
      </nav>
      

    );
  }
}
