import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GiGoose } from 'react-icons/gi';

export default class Navbar extends React.Component {

  render() {
    return (
      
      <nav className="navbar navbar-expand-lg bg-dark">
        <Link to="/"className="navbar-brand text-white">
          <GiGoose/> plan
        </Link>
        {/*
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={this.state.loggedIn ? "/logout" : "/login"} className="nav-link text-white">{this.state.loggedIn ? "Sign out" : "Login"}</Link>
          </li>
        </ul>
        </div>
        */}
      </nav>
      
    );
  }
}
