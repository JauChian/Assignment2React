import React, {useState} from 'react';
import {baseUrl} from "../../constants";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateStudent(props) {
    const [DOB, setDOB] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

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

    function createClass() {
        // Using the state values to create the data object
        let data = {
            "DOB": DOB,
            "first_name": first_name,
            "last_name": last_name,
            "email": email
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/students/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate('/students');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Create a Student</h1>
            <p>Date of Birth: <input name={'DOB'} type={'date'} placeholder={'DOB'} onChange={DOBHandler}/></p>
            <p>First Name: <input name={'first_name'} type={'text'} onChange={firstNameHandler}/></p>
            <p>Last Name: <input name={'last_name'} type={'text'} onChange={lastNameHandler}/></p>
            <p>Email: <input name={'email'} type={'email'} onChange={emailHandler}/></p>


            <button onClick={createClass}>Create Student</button>
        </div>
    );
}

export default CreateStudent;