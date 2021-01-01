import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: "",
            loggedIn: false,
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
                    Login
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
                    <br/>
                    <button className="btn btn-warning ">
                        Login
                    </button>
                    <br/>
                    <label>{this.state.message}</label>
                    <br/>
                <Link to="/signup">No account? Register</Link>
                </form>
                </div>
            </div>
        );

    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            this.setState({message: "Please enter all fields"});
        }
        else {
            Axios({
                method: 'POST',
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                withCredentials: true,
                url: 'http://localhost:5000/login',
            }).then((res) => {
                console.log(res);

                if (res.data === 'err') {
                    this.setState({message: "Invalid credentials"});
                }
                else {
                    window.location = "/plan";
                }
            });

            //e.preventDefault();
        }
    }

    handleChange(e) {
        if (e.target.id === "uname") {
            this.setState({username: e.target.value});
        }
        else if (e.target.id === "pword") {
            this.setState({password: e.target.value});
        }
    }
}