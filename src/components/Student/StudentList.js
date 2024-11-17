import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function StudentList(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState(null);
    const [students, setStudents] = useState([])

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
            url: baseUrl+'api/students/',
            headers: {
                 'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setStudents(response.data)
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
            url: baseUrl + 'api/students/' + id + '/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setStudents(students.filter(student => student.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <h1>List of Student</h1>
            {error ? <p>{error}</p> : null}
            <div>
                {userInfo && userInfo.user_group === 'admin' ? (
                    <>
                        <Link to={'/create_student'} className={'btn btn-success'}>Create a Student</Link>
                        {students.map(student =>(
                            <div key={student.id}>
                                <Link to={`/student_detail/`} state={{id:student.id}}>
                                    {student.id}-{student.first_name}-{student.last_name}
                                </Link>
                                <div>
                                    <Link to={'/update_student '} state={{id: student.id}}
                                          className={'btn btn-success'}>Update</Link>
                                    <button onClick={() => deleteClass(student.id)} className={'btn btn-danger'}>Delete
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

export default StudentList;