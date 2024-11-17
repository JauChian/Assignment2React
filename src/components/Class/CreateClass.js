import React, {useEffect, useState} from 'react';
import Semester from "../Semester/Semester";
import axios from "axios";
import {baseUrl} from "../../constants";
import {getElement} from "bootstrap/js/src/util";
import StudentNames from "../Student/StudentNames";
import Lecturer from "../Lecturer/Lecturer";
import Course from "../Course/Course";
import { useNavigate } from 'react-router-dom';

function CreateClass(props) {
    const [number, setNumber] = useState('');
    const [semester, setSemester] = useState('');
    const [course, setCourse] = useState('');
    const [lecturer, setLecturer] = useState('');
    const navigate = useNavigate();


    function  numberHandler(e){
        setNumber(e.target.value)
    }

    function createClass(){
        // Using the state values to create the data object
        let data = {
            number: number,
            semester: document.getElementById('semester').value,
            course: document.getElementById('course').value,
            lecturer: document.getElementById('lecturer').value,
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate('/classes');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Create a Class</h1>
            <p>Class Number:</p>
            <input name={'number'} type={'number'} placeholder={'number'} onChange={numberHandler}/>
            <p>
                Semester:
                <select id={"semester"}>
                    <Semester/>
                </select>
            </p>
            <p>
                Course:
                <select id={"course"}>
                    <Course/>
                </select>
            </p>
            <p>
                Lecturer:
                <select id={"lecturer"}>
                    <Lecturer/>
                </select>
            </p>
            <button onClick={createClass}>Create Class</button>
        </div>
    );
}

export default CreateClass;