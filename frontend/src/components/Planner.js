import React, { Component, useDebugValue, useEffect, useState } from 'react';
import Axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import { BiCheckBox , BiCheckboxSquare , BiCheckboxChecked } from 'react-icons/bi';

export default class Planner extends React.Component {

    render() {
        return (
            <div>
                <Input />
                <List />
                {/*<Edit todo = {{todo_id: '1', title: 't', course: 'c', date: 'd', time: 't'}} />*/}
            </div>
        );
    }
}
// LOGOUT BUTTON on navbar by (window.location === '/plan') ? x : y
// using functions with hooks instead of react components
const Input = () => {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = (async (e) => {
        e.preventDefault();
        // form validation

        // send
        Axios({
            method: 'POST',
            data: {
                title: title,
                course: course,
                date: date,
                time: time
            },
            withCredentials: true,
            url: 'http://localhost:5000/create'
        }).then((res) => {
            console.log(res);
        });

        window.location = "/plan";

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

    const getList = (async () => {
        Axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/read',
        }).then((res) => {
            console.log(res);
            setList(res.data);
        });
    });

    const toggleComplete = (async (item) => {
        let done = 0;

        if (item.is_done) {
            done = 0;
        }
        else {
            done = 1;
        }

        Axios({
            method: 'PUT',
            withCredentials: true,
            data: {
                title: item.title,
                course: item.course,
                date: item.date,
                time: item.time,
                isDone: done
            },
            url: `http://localhost:5000/read/${item.todo_id}`
        });

        window.location = "/plan";
    });

    useEffect(() => {
        Axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/'
        }).then((res) => {
            if (res.data) {
                getList();
            }
            else {
                window.location = '/login';
            }
        });
    }, []);

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
                   {list.map((item) => (
                        <tr key={item.todo_id}>
                            <td>
                                <button
                                    className={item.is_done ? "btn btn-dark" : "btn btn-white"}
                                    onClick={() => {toggleComplete(item)}}
                                >
                                    {item.is_done ? "X" : "O"}
                                </button>
                            </td>
                            <td>{item.title}</td>
                            <td>{item.course}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>
                                <Edit todo = { item } />
                            </td>
                        </tr>
                    ))}                    
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

    const updateTodo = (async (e) => {
        Axios({
            method: 'PUT',
            data: {
                title: title,
                course: course,
                date: date,
                time: time
            },
            withCredentials: true,
            url: `http://localhost:5000/read/${todo.todo_id}`
        });
        window.location = '/plan';
    });

    const deleteTodo = (async (e) => {
        Axios({
           method: 'DELETE',
           withCredentials: true,
           url: `http://localhost:5000/read/${todo.todo_id}` 
        });
        window.location = '/plan';
    });

    return (
        <div>
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}
            >
                <AiFillEdit />
            </button>

            <div
                className="modal"
                id={`id${todo.todo_id}`}
                onClick={() => {
                    setTitle(todo.title);
                    setCourse(todo.course);
                    setDate(todo.date);
                    setTime(todo.time);
                }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
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
                        </div>
                        <div class="modal-footer">
                            <button 
                                onClick={deleteTodo} 
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Delete
                            </button>
                            <button 
                                onClick={updateTodo} 
                                type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}