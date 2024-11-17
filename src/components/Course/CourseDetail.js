import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseUrl} from "../../constants";
import axios from "axios";

function CourseDetail(props) {
    const location = useLocation()
    const {id} = location.state
    const [error, setError] = useState("")
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseID, setCourseID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/courses/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCourseID(response.data.id);
                setCourseCode(response.data.code);
                setCourseName(response.data.name);
                setError("");
            })
            .catch((error) => {
                console.log(error);
                setError(error)
            });
    }, []);

    function handleBackToCourseList() {
        navigate('/courses');
    }

    return (
        <div>
            {error ? <p>{error}</p> : null}
            <h1>Course Detail</h1>
            <p>Course ID: {courseID}</p>
            <p>Course Code: {courseCode}</p>
            <p>Course Name: {courseName}</p>
            <button onClick={handleBackToCourseList} className={'btn btn-primary'}>Back to Course List</button>
        </div>
    );
}

export default CourseDetail;