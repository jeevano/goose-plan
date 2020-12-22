import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Planner from "./components/Planner";

function App() {
  return (
    <Router>
        <Navbar />
          <Route path="/" exact component={Planner} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        <br/>
    </Router>
  );
}

export default App;
