import React, { Component } from 'react';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmpassword: "",
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
                    Sign Up
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
                    <label>Confirm Password:</label>
                    <br/>
                    <input
                        id="cpword"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <br/>
                    <br/>
                    <button className="bg-warning">Create Account</button>

                </form>
            </div>
            </div>
            
        );
    }
    // 
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.username);
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