import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default class Navbar extends React.Component {
  render() {
    return (
      
      <nav className="navbar navbar-expand-lg bg-dark">
        <Link to="/" className="navbar-brand">
          goose-plan
        </Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Planner</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="navbar-item">
          <Link to="/signup" className="nav-link">Signup</Link>
          </li>
        </ul>
        </div>
      </nav>
      

    );
  }
}
