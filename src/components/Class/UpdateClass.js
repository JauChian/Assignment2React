import React, { useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from "../../constants";
import { useLocation } from "react-router-dom";
import Semester from "../Semester/Semester";
import Course from "../Course/Course";
import Lecturer from "../Lecturer/Lecturer";
import { useNavigate } from 'react-router-dom';
function UpdateClass(props) {
    const location = useLocation();
    const { id } = location.state;
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [lecturer, setLecturer] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/' + id + '/',
            headers: { 'Authorization': 'token ' + localStorage.getItem('token') },
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                setNumber(response.data.number);
                setSemester(response.data.semester);
                setCourse(response.data.course);
                setLecturer(response.data.lecturer);
            })
            .catch((error) => {
                console.error("Error fetching class data:", error);
                setError("Unable to fetch class data.");
            });
    }, [id]);


    function updateClass() {
        let data = {
            number: document.getElementById('number').value,
            semester: document.getElementById('semester').value,
            course: document.getElementById('course').value,
            lecturer: document.getElementById('lecturer').value,
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/' + id + '/',
            headers: { 'Authorization': 'token ' + localStorage.getItem('token') },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Class updated successfully:", response.data);
                navigate('/classes');
            })
            .catch((error) => {
                console.error("Error updating class:", error);
                setError("Unable to update class.");
            });
    }

    // 处理班级编号的变更
    function numberHandler(e) {
        setNumber(e.target.value);
    }

    return (
        <div>
            <h1>Update Class</h1>
            <p>
                Class Number:
                <input id={'number'} type={'number'} value={number}/>
            </p>
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
            <button onClick={updateClass}>Update Class</button>
        </div>
    );
}

export default UpdateClass;
