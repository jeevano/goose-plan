import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmpassword: "",
            message: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <h1 class="d-flex justify-content-center ">
                    Register
                </h1>
                <div class="d-flex justify-content-center ">
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <br/>
                    <input
                        id="uname"
                        className="form-control"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input
                        type="password"
                        className="form-control"
                        id="pword"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <br/>
                    <label>Confirm Password:</label>
                    <br/>
                    <input
                        type="password"
                        className="form-control"
                        id="cpword"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <br/>
                    <br/>
                    <button className="btn btn-warning">
                        Create Account
                    </button>
                    <br/>
                    <label>{this.state.message}</label>
                    <br/>
                <Link to="/login">Have an account? Login</Link>
                </form>
            </div>
            </div>
            
        );
    }
    // 
    handleSubmit(e) {
        // form validation
        e.preventDefault();
        var invalid = false;
        if (this.state.password.length < 6) {
            invalid = true;
            this.setState({message: "Password too short (<6)"});
            //e.preventDefault();
        }
        if (this.state.password !== this.state.confirmpassword) {
            invalid = true;
            this.setState({message: "Passwords do not match"});
            //e.preventDefault();
        }
        if (!this.state.username || !this.state.password || !this.state.confirmpassword) {
            invalid = true;
            this.setState({message: "Please enter all fields"});
            //e.preventDefault();
        }

        if (!invalid) {
            Axios({
                method: 'POST',
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                withCredentials: true,
                url: 'http://localhost:5000/signup',
            }).then((res) => {
                console.log(res);
                if (res === 'account registered') {
                    this.setState({message: "Registration succesful"});
                    window.location = "/login";
                }
                else {
                    this.setState({message: "Username already in use"});
                    //e.preventDefault();
                }
            });
        }
    }
    
    handleChange(e) {
        if (e.target.id === "uname") {
            this.setState({username: e.target.value});
        }
        else if (e.target.id === "pword") {
            this.setState({password: e.target.value});
        }
        else if (e.target.id === "cpword") {
            this.setState({confirmpassword: e.target.value});
        }
    }
}