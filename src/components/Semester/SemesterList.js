import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function SemesterList(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [semesters, setSemesters] = useState([])
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
            url: baseUrl + 'api/semesters/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setSemesters(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function deleteSemester(id) {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/semesters/' + id + '/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSemesters(semesters.filter(semester => semester.id !== id)); // 更新课程列表
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>List of Semesters</h1>
            {error ? <p>{error}</p> : null}
            <div>
                {userInfo && userInfo.user_group === 'admin' ? (
                    <>
                        <Link to={'/create_semester'} className={'btn btn-success'}>Create a Semester</Link>
                        {semesters.map(semester => (
                            <div key={semester.id}>
                                <Link to={`/semester_detail/`} state={{id: semester.id}}>
                                    {semester.year}-{semester.semester}
                                </Link>
                                <div>
                                    <Link to={'/update_semester'} state={{id: semester.id}}
                                          className={'btn btn-success'}>Update</Link>
                                    <button onClick={() => deleteSemester(semester.id)}
                                            className={'btn btn-danger'}>Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>You have to be an admin to check info</p>
                )}
            </div>

        </div>
    );
}

export default SemesterList;