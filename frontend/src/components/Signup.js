import React, { Component } from 'react';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmpassword: "",
        }
    }

    render() {
        return (
            <div>
                <h1>SIGN UP</h1>
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
                    <button className="bg-white">Create Account</button>

                </form>
            </div>
        );
    }
    // 
    handleSubmit(e) {

    }
    
    handleChange(e) {
        //this.setState({ username: e.target.value });
    }
}