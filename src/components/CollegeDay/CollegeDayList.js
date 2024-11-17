import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function CollegeDayList(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [collegeDays, setCollegeDays] = useState([])
    const [userInfo, setUserInfo] = useState(null); // 初始状态为 null

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            setLoginStatus(true);
            setToken(localStorage.getItem('token'));

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: baseUrl + 'api/get_user_info/',
                headers: {
                    'Authorization': 'token ' + localStorage.getItem('token')
                }
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setUserInfo(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setCollegeDays(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function deleteClass(id) {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/' + id + '/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCollegeDays(collegeDays.filter(collegeDay => collegeDay.id !== id)); // 更新课程列表
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Attendance</h1>
            <h2>List of College Days</h2>
            {error ? <p>{error}</p> : null}
            {userInfo && userInfo.user_group === 'admin' ? (
                <Link to={'/create_collegeDay'} className={'btn btn-success'}>Create a College Days</Link>
            ) : (
                null
            )}
            {collegeDays.map(collegeDay =>
                <div key={collegeDay.id}>
                    <Link to={`/collegeDay_detail/`} state={{id: collegeDay.id}}>
                     College Day ID:   {collegeDay.id} -{collegeDay.date} - Class Info: Class ID: {collegeDay.class_obj}-{collegeDay.semester_year}--{collegeDay.semester_name}- {collegeDay.course_name}
                    </Link>
                    {userInfo && userInfo.user_group === 'admin' ? (
                        <div>
                            <Link to={'/update_collegeDay'} state={{id: collegeDay.id}}
                                  className={'btn btn-success'}>Update</Link>
                            <button onClick={() => deleteClass(collegeDay.id)} className={'btn btn-danger'}>Delete</button>
                        </div>
                    ) : (
                        null
                    )}

                </div>
            )}
        </div>
    );
}

export default CollegeDayList;