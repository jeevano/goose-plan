import React, { Component } from 'react';

export default class Planner extends React.Component {
    render() {
        return  (
            <div>
                <h1>PLANNER</h1>
            </div>
        );

    }
}

// do i have to export and import these classes
// single plan (todo list item)
// planner > courses > list > plans
class Plan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            done: false,
            time: "",
            date: "",
        }
    }

    render() {
        return (
           <h1>Plan</h1>
        );
    }
}

// field where shows plans and also field to input (todo list)
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <h1>List</h1>
        );
    }
}

// each course has a list, each list has multiple plans
class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }
    }

    render() {
        return (
            <h1>Course</h1>
        );
    }
}