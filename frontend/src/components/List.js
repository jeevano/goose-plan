import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BiCheckbox , BiCheckboxSquare , BiCheckboxChecked } from 'react-icons/bi';
import Edit from './Edit';

//
//  LIST THE TODO ITEMS
//
const List = (scourse) => {
    const [list, setList] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(scourse.course);

    const getList = (async () => {
        var tempurl = '/read';
        if (scourse.course !== '') {
            tempurl = `/readcourse/${scourse.course}`
        }

        Axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000${tempurl}`,
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
        setForceUpdate(scourse.course);
        getList();
    }, [scourse.course]);

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
                                    className="btn btn-white"
                                    onClick={() => {toggleComplete(item)}}
                                >
                                    {item.is_done ? (<BiCheckboxSquare />) : (<BiCheckbox />)}
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
            {console.log(forceUpdate)}
        </div>
    );
}

export default List;