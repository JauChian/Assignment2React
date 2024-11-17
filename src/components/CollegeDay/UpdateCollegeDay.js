import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseUrl} from "../../constants";
import axios from "axios";
import Classes from "../Class/Classes";

function UpdateCollegeDay(props) {
    const location = useLocation();
    const { id } = location.state;
    const [date, setDate] = useState('');
    const [class_obj, setClass_obj] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");
      function dateHandler(e) {
        setDate(e.target.value)
    }

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setDate(response.data.date);
                setClass_obj(response.data.class_obj);
                setError("");
            })
            .catch((error) => {
                console.log(error);
                setError(error)
            });
    }, []);

     function dateHandler(e) {
        setDate(e.target.value)
    }
    function updateClass() {
        let data = {
            date: date,
            class_obj: document.getElementById('class11').value
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/' + id + '/',
            headers: { 'Authorization': 'token ' + localStorage.getItem('token') },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Class updated successfully:", response.data);
                navigate('/collegeDays');
            })
            .catch((error) => {
                console.error("Error updating class:", error);
                setError("Unable to update class.");
            });
    }

    return (
        <div>
            <h1>Update College Day</h1>
            <p>
                Select Date:
                <input name={'date'} type={'date'} value={date} onChange={dateHandler}/>
            </p>

            <p>
                Select a Class:
                <select id={"class11"}>
                    <Classes/>
                </select>
            </p>
            <button onClick={updateClass}>Update College Day</button>
        </div>
    );
}

export default UpdateCollegeDay;