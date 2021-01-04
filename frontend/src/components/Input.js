import React, { useState , useEffect } from 'react';
import Axios from 'axios';

// react-date-picker and react-time-picker
const Input = (scourse) => {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState(scourse.course);
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

    useEffect(() => {
        setCourse(scourse.course);
    }, [scourse.course]);

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
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="time"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button className="btn btn-success">+</button>
            </form>
        </div>
    );
}

export default Input;