import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function Semester(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [semesters, setSemesters] = useState([])

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl+'api/semesters/',
            headers: {
                 'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setSemesters(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Fragment>
            {semesters.map(semester1 =>
                <option value={semester1.id} key={semester1.id}>{semester1.year}-{semester1.semester}</option>
            )}
        </Fragment>
    );
}

export default Semester;