import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function StudentNames(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [students, setStudents] = useState([])
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl+'api/students/',
            headers: {
                 'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setStudents(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Fragment>
            {students.map(student =>
                <option value={student.id} key={student.id}>{student.id}-{student.first_name}-{student.last_name}</option>
            )}
        </Fragment>
    );
}

export default StudentNames;