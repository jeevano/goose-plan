import React, { Component } from 'react';
import Axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
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
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input
                        id="pword"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <br/>
                    <br/>
                    <button className="bg-warning ">Login</button>
                </form>
                </div>
            </div>
        );

    }

    handleSubmit(e) {
        if (!this.state.username || !this.state.password) {

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
            }).then((res) => console.log(res));
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