import React, {Fragment, useEffect, useState} from 'react';
import {baseUrl} from "../../constants";
import axios from "axios";

function Classes(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [classes, setClasses] = useState([])

    useEffect(() => {

        let configClasses = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(configClasses)
            .then((response) => {
                setClasses(response.data);
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Fragment>
            {classes.map(class1 =>
                <option value={class1.id} key={class1.id}>
                    Class ID: {class1.id} Semester: {class1.semester_year} - {class1.semester_name} Course: {class1.course_code} {class1.course_name}
                </option>
            )}
        </Fragment>
    );
}

export default Classes;