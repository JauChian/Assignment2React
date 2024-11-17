import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function Lecturer(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [lecturers, setLecturers] = useState([])
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl+'api/lecturers/',
            headers: {
                 'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setLecturers(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Fragment>

            {lecturers.map(lecturer =>
                <option value={lecturer.id} key={lecturer.id}>{lecturer.id}-{lecturer.first_name}-{lecturer.last_name}</option>
            )}
        </Fragment>
    );
}

export default Lecturer;