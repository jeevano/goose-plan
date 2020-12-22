import React, { Component } from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    render() {
        return (
            <div>
                <h1>LOGIN</h1>
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
                    <button className="bg-white">Login</button>
                </form>
            </div>
        );

    }

    handleSubmit(e) {
        console.log("test");
    }

    handleChange(e) {
        
    }
}