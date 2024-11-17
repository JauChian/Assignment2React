import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../constants";

function UpdateCourse(props) {
    const location = useLocation();
    const {id} = location.state;
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function codeHandler(e) {
        setCode(e.target.value)
    }

    function nameHandler(e) {
        setName(e.target.value)
    }

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/courses/' + id + '/',
            headers: { 'Authorization': 'token ' + localStorage.getItem('token') },
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                setCode(response.data.code);
                setName(response.data.name);

            })
            .catch((error) => {
                console.error("Error fetching class data:", error);
                setError("Unable to fetch class data.");
            });
    }, [id]);

    function updateCourse() {

        let data = {
            "code": code,
            "name": name
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/courses/' + id + '/',
            headers: { 'Authorization': 'token ' + localStorage.getItem('token') },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate('/courses');
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div>
            <h1>Update Course</h1>
            <p>Code: <input id={'code'} type={'text'} value={code} onChange={codeHandler}/></p>
            <p>Name: <input id={'name'} type={'text'} value={name} onChange={nameHandler}/></p>
            <button onClick={updateCourse}>Update Course</button>
        </div>
    );
}

export default UpdateCourse;