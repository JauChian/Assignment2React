import React, {useState} from 'react';
import {baseUrl} from "../../constants";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateSemester(props) {
    const [year, setYear] = useState("")
    const [semester, setSemester] = useState("")
    const navigate = useNavigate();

    function yearHandler(e) {
        setYear(e.target.value)
    }

    function semesterHandler(e) {
        setSemester(e.target.value)
    }

    function createSemester() {

        let data = {
            "year": year,
            "semester": semester
        };


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/semesters/',
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
            <h1>Create Semester</h1>
            <p>Year: <input name={'year'} type={'number'}  onChange={yearHandler}/></p>
            <p>Semester: <input name={'semester'} type={'text'} onChange={semesterHandler}/></p>
            <button onClick={createSemester}>Create Semester</button>
        </div>
    );
}

export default CreateSemester;