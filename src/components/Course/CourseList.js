import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {Link} from "react-router-dom";

function CourseList(props) {
    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
    const [courses, setCourses] = useState([])
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
            url: baseUrl+'api/courses/',
            headers: {
                 'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setCourses(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function deleteCourse(id) {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/courses/' + id + '/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCourses(courses.filter(course => course.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>List of Courses</h1>
            {error ? <p>{error}</p> : null}
            <div>
                {userInfo && userInfo.user_group === 'admin' ? (
                    <>
                        <Link to={'/create_course'} className={'btn btn-success'} >Create a Course</Link>
                        {courses.map(course => (
                            <div key={course.id}>
                                <Link to={`/course_detail/`} state={{id: course.id}}>
                                    {course.code}-{course.name}
                                </Link>
                                <div>
                                    <Link to={'/update_course'} state={{id: course.id}} className={'btn btn-success'}>Update</Link>
                                    <button onClick={() => deleteCourse(course.id)} className={'btn btn-danger'}>Delete</button>
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

export default CourseList;