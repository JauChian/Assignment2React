import React, { useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from "../../constants";
import { Link } from "react-router-dom";

function ClassList(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [classes, setClasses] = useState([])
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

        let configClasses = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(configClasses)
            .then((response) => {
                setClasses(response.data);
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
            url: baseUrl + 'api/classes/' + id + '/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setClasses(classes.filter(class1 => class1.id !== id)); // 更新课程列表
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>List of Class</h1>
            {error ? <p>{error}</p> : null}
            <div>
                {userInfo && userInfo.user_group === 'admin' ? (
                    <>
                        <Link to={'/create_class'} className={'btn btn-success'} >Create a Class</Link>
                        {classes.map((class1) => (
                            <div key={class1.id}>
                                <Link to={`/class_detail/`} state={{id: class1.id}}>
                                    Class Number: {class1.number} Semester: {class1.semester_year} - {class1.semester_name} Course: {class1.course_code} {class1.course_name}
                                </Link>
                                <div>
                                    <Link to={'/update_class'} state={{id: class1.id}} className={'btn btn-success'}>Update</Link>
                                    <button onClick={() => deleteClass(class1.id)} className={'btn btn-danger'}>Delete</button>
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

export default ClassList;
