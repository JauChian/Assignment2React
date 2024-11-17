import React, {useState} from 'react';
import Classes from "../Class/Classes";
import {baseUrl} from "../../constants";
import axios from "axios";
import Course from "../Course/Course";
import {useNavigate} from "react-router-dom";

function CreateCollegeDay(props) {
    const [date, setDate] = useState('');
    const [class_obj, setClass_obj] = useState([]);
    const navigate = useNavigate();

    function dateHandler(e) {
        setDate(e.target.value)
    }


    function createClass(){
        // Using the state values to create the data object
        let data = {
            date: date,
            class_obj: document.getElementById('class11').value
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate('/collegeDays');
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div>
            <h1>Create a College Day</h1>
            <p>
                Select Date:
                <input name={'date'} type={'date'} onChange={dateHandler}/>
            </p>

            <p>
                Select a Class:
                <select id={"class11"}>
                    <Classes/>
                </select>

            </p>

            <button onClick={createClass}>Create College Day</button>
        </div>
    );
}

export default CreateCollegeDay;