import React, { Component, useState } from 'react';
import Axios from 'axios';

export default class Planner extends React.Component {

    render() {
        return (
            <div>
                <Input />
                <List />
            </div>
        );
    }
}

// using functions with hooks instead of react components
const Input = () => {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    // const [done, setDone] = useState(0); ?

    const handleSubmit = ((e) => {
        e.preventDefault();
        // form validation

        // send
        Axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/'
        }).then((res) => {
            console.log(res);
        });

    });

    return (
        <div className="d-flex justify-content-center">
            <form className="d-flex justify-content-center mt-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button className="btn btn-warning">+</button>
            </form>
        </div>
    );
}

const List = () => {
    const [list, setList] = useState([]); // * empty array of json?

    const getList = (() => {
        Axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/list',
        }).then((res) => {
            console.log(res);
        });
    });

    return (
        <div>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {""}
                </tbody>
            </table>
        </div>
    );
}

const Edit = ({ todo }) => {
    const [title, setTitle] = useState(todo.title);
    const [course, setCourse] = useState(todo.course);
    const [date, setDate] = useState(todo.date);
    const [time, setTime] = useState(todo.time);

    return (
        <div>

        </div>
    );
}