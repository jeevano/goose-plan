import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Input from './Input';
import List from './List';
import { AiFillEdit } from 'react-icons/ai';

//
//  LIST THE USERS COURSES
//
const CourseBar = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    const [subject, setSubject] = useState('');
    const [num, setNum] = useState('');

    const getCourses = (async () => {
        Axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/course'
        }).then((res) => {
            console.log(res);
            setCourses(res.data);
        });
    });

    const addCourse = (async () => {
        Axios({
            method: 'POST',
            withCredentials: true,
            url: `http://localhost:5000/course/${subject+num}`
        });
        window.location = "/plan";
    });

    const deleteCourse = (async () => {
        Axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:5000/course/${subject+num}`
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
                getCourses();
            }
            else {
                window.location = '/login';
            }
        });
    }, []);

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-center">
            <button
                type="button"
                className="btn btn-dark"
                onClick={() => {setSelectedCourse('')}}
            >
                All
            </button>
            {courses.map((item) => (
                <div key={item.course_id}>
                    <button
                        type="button"
                        className="btn btn-white"
                        onClick={() => setSelectedCourse(item.course)}
                    >
                        {item.course}
                    </button>
                </div>
            ))}
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target="#idEDITCOURSES"
            >
                <AiFillEdit />
            </button>

            <div
                className="modal"
                id="idEDITCOURSES"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                            <h5>Edit courses</h5>
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
                                id="subject"
                                onChange={(e) => {setSubject(e.target.value)}}
                            />
                            <input
                                type="text"
                                className="form-control"
                                id="num"
                                onChange={(e) => {setNum(e.target.value)}}
                            />
                        </div>
                        <div class="modal-footer">
                            <button 
                                onClick={deleteCourse} 
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Delete
                            </button>
                            <button 
                                onClick={addCourse} 
                                type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                            >
                                Add
                            </button>
                        </div>
                    </div> 
                </div>
            </div>
            </div>
            <Input course = {selectedCourse} />
            <List course = {selectedCourse} />
        </div>
    );
}

export default CourseBar;