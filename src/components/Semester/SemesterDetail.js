import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";

function SemesterDetail(props) {
    const [year, setYear] = useState("")
    const [semester, setSemester] = useState("")
    const [error, setError] = useState("")
    const location = useLocation()
    const { id } = location.state
    const navigate = useNavigate();

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/semesters/'+ id + '/',
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

    function handleBack() {
        navigate('/semesters');
    }

    return (
        <div>
            <h1>Semester Detail</h1>
            {error ? <p>{error}</p> : null}
            <p>Semester: {semester}</p>
            <p>Year of Semester: {year}</p>
            <button onClick={handleBack} className={'btn btn-primary'}>Back to Semester List</button>
        </div>
    );
}

export default SemesterDetail;