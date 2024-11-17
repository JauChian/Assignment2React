import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseUrl} from "../../constants";
import axios from "axios";

function UpdateLecturer(props) {
    const location = useLocation()
    const {id} = location.state
    const [ID, setID] = useState("")
    const [DOB, setDOB] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState("")

    function DOBHandler(e) {
        setDOB(e.target.value)
    }

    function firstNameHandler(e) {
        setFirstName(e.target.value)
    }

    function lastNameHandler(e) {
        setLastName(e.target.value)
    }

    function emailHandler(e) {
        setEmail(e.target.value)
    }

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/lecturers/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setID(response.data.id);
                setDOB(response.data.DOB);
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setEmail(response.data.email);
                setError("");
            })
            .catch((error) => {
                console.log(error);
                setError(error)
            });
    }, []);

    function updateClass() {
        let data = {
            "DOB": DOB,
            "first_name": first_name,
            "last_name": last_name,
            "email": email
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/lecturers/' + id + '/',
            headers: { 'Authorization': 'token ' + localStorage.getItem('token') },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Lecturer updated successfully:", response.data);
                navigate('/lecturers');
            })
            .catch((error) => {
                console.error("Error updating class:", error);
                setError("Unable to update class.");
            });
    }

    return (
        <div>
            <h1>Update Lecturer</h1>

            <p>Date of Birth: <input name={'DOB'} type={'date'} value={DOB} onChange={DOBHandler}/></p>
            <p>First Name: <input name={'first_name'} type={'text'} value={first_name} onChange={firstNameHandler}/></p>
            <p>Last Name: <input name={'last_name'} type={'text'}  value={last_name} onChange={lastNameHandler}/></p>
            <p>Email: <input name={'email'} type={'email'} value={email} onChange={emailHandler}/></p>

            <button onClick={updateClass} className={'btn btn-primary'}>Update Lecturer</button>
        </div>
    );
}

export default UpdateLecturer;