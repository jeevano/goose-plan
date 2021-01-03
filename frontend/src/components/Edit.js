import React, { useState } from 'react';
import Axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';

//
//  MODAL TO EDIT TODO ITEMS
//
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

export default Edit;