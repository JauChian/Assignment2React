import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseUrl} from "../../constants";
import axios from "axios";


function UpdateSemester(props) {
    const [error, setError] = useState("");
    const location = useLocation();
    const {id} = location.state;
    const navigate = useNavigate();
    const [year, setYear] = useState("")
    const [semester, setSemester] = useState("")

    function yearHandler(e) {
        setYear(e.target.value)
    }

    function semesterHandler(e) {
        setSemester(e.target.value)
    }

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/semesters/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSemester(response.data.semester);
                setYear(response.data.year);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    function updateSemester() {
        let data = {
            "year": year,
            "semester": semester
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/semesters/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate('/semesters');
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div>
            <h1>Update Semester</h1>
            <p>Year: <input name={'year'} type={'number'} value={year} onChange={yearHandler}/></p>
            <p>Semester: <input name={'semester'} type={'text'} value={semester} onChange={semesterHandler}/></p>
            <button onClick={updateSemester}>Update Semester</button>
        </div>
    );
}

export default UpdateSemester;