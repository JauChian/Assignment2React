import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function CourseList(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [courses, setCourses] = useState([])
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl+'api/courses/',
            headers: {
                 'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setCourses(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Fragment>
            {courses.map(course =>
                <option value={course.id} key={course.id}>{course.code}-{course.name}</option>
            )}
        </Fragment>
    );
}

export default CourseList;