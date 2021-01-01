import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Planner from "./components/Planner";

function App() {
    return (
      <Router>
          <Navbar />
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/plan" exact component={Planner} />
          <br/>
      </Router>
    );
  
}

export default App;