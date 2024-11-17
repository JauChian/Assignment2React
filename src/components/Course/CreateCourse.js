import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {baseUrl} from "../../constants";

function CreateCourse(props) {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();

    function codeHandler(e) {
        setCode(e.target.value)
    }

    function nameHandler(e) {
        setName(e.target.value)
    }

    function createCourse() {

        let data = {
            "code": code,
            "name": name
        };


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/courses/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
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
            <h1>Create Course</h1>
            <p>Code: <input name={'code'} type={'text'} placeholder={'code'} onChange={codeHandler}/></p>
            <p>Name: <input name={'name'} type={'text'} onChange={nameHandler}/></p>
            <button onClick={createCourse}>Create Course</button>
        </div>
    );
}

export default CreateCourse;