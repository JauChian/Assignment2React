import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function LecturerList(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [lecturers, setLecturers] = useState([])
    const [userInfo, setUserInfo] = useState(null);

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
            url: baseUrl + 'api/lecturers/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setLecturers(response.data)
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
            url: baseUrl + 'api/lecturers/' + id + '/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLecturers(lecturers.filter(lecturer => lecturer.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>List of Lecturer</h1>
            {error ? <p>{error}</p> : null}
            <div>
                {userInfo && userInfo.user_group === 'admin' ? (
                    <>
                        <Link to={'/create_lecturer'} className={'btn btn-success'}>Create a Lecturer</Link>
                        {lecturers.map(lecturer =>(
                            <div key={lecturer .id}>
                                <Link to={`/lecturer_detail/`} state={{id: lecturer .id}}>
                                    {lecturer.id}-{lecturer.first_name}-{lecturer.last_name}
                                </Link>
                                <div>
                                    <Link to={'/update_lecturer '} state={{id: lecturer.id}}
                                          className={'btn btn-success'}>Update</Link>
                                    <button onClick={() => deleteClass(lecturer .id)} className={'btn btn-danger'}>Delete
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

export default LecturerList;

