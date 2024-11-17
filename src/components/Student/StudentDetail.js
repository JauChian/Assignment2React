import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseUrl} from "../../constants";
import axios from "axios";

function StudentDetail(props) {
    const location = useLocation()
    const {id} = location.state
    const [ID, setID] = useState("")
    const [DOB, setDOB] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState("")

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/students/' + id + '/',
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

    function handleBackToClassList() {
        navigate('/students');
    }

    return (
        <div>
            {error ? <p>{error}</p> : null}
            <h1>Student Detail</h1>
            <p>Student ID: {ID}</p>
            <p>Student DOB: {DOB}</p>
            <p>First Name: {first_name}</p>

            <p>Last Name: {last_name}</p>
            <p>Email: {email}</p>
            <button onClick={handleBackToClassList} className={'btn btn-primary'}>Back to Student List</button>

        </div>
    );
}

export default StudentDetail;