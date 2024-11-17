import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseUrl} from "../../constants";
import axios from "axios";
import StudentName from "../Student/StudentName";

function CollegeDayDetail(props) {
    const location = useLocation()
    const {id} = location.state
    const [collegeDayId, setCollegeDayId] = useState("");
    const [classId, setClassId] = useState("");
    const [date, setDate] = useState('');
    const [lecturerFirstName, setLecturerFirstName] = useState("");
    const [lecturerLastName, setLecturerLastName] = useState("");
    const [semesterName, setSemesterName] = useState("");
    const [semesterYear, setSemesterYear] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [error, setError] = useState("")
    const [token, setToken] = useState("")
    const navigate = useNavigate();
    const [attendStudents, setAttendStudents] = useState([]);
    const [absentStudents, setAbsentStudents] = useState([]);
    const [enrollStudents, setEnrollStudents] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loginStatus, setLoginStatus] = useState(false)

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
        getCollegeDayDetail()
    }, []);

    useEffect(() => {
        if (classId) {
            getClassInfo(classId);
        }
    }, [classId]);

    function getCollegeDayDetail() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCollegeDayId(response.data.id);
                setDate(response.data.date);
                setClassId(response.data.class_obj);
                setSemesterName(response.data.semester_name);
                setSemesterYear(response.data.semester_year);
                setCourseCode(response.data.course_code);
                setCourseName(response.data.course_name);
                setLecturerFirstName(response.data.lecturer_first_name);
                setLecturerLastName(response.data.lecturer_last_name);
                setAttendStudents(response.data.students);
                setError("");
            })
            .catch((error) => {
                console.log(error);
                setError(error)
            });
    }

    function getClassInfo(classID) {
        // 获取班级信息
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/' + classID + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setEnrollStudents(response.data.students);
                setError("");

            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    }

    function filterStudents() {
        if (enrollStudents.length === 0) {
            setAbsentStudents([]);
            return;
        } else if (attendStudents.length === 0) {
            setAbsentStudents(enrollStudents);
        } else {
            // 過濾掉已經參加的學生
            const filteredStudents = enrollStudents.filter(student =>
                !attendStudents.includes(student)
            );
            setAbsentStudents(filteredStudents);
        }
    }

    function handleBackToClassList() {
        navigate('/collegeDays');
    }

    function addStudent(studentId) {
        const updatedStudents = [...attendStudents, studentId];

        let data = {
            students: updatedStudents
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Student enrolled successfully:", response.data);
                setAttendStudents(updatedStudents);
                setAbsentStudents(absentStudents.filter(student => student !== studentId));
            })
            .catch((error) => {
                console.error("Error enrolling student:", error);
                setError("Unable to enroll student.");
            });
    }

    function removeStudent(studentId) {
        const updatedStudents = attendStudents.filter(id => id !== studentId);

        let data = {
            students: updatedStudents
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/collegeDays/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Student removed successfully:", response.data);
                setAttendStudents(updatedStudents);
                if (!absentStudents.includes(studentId)) {
                    setAbsentStudents([...absentStudents, studentId]);
                }
            })
            .catch((error) => {
                console.error("Error removing student:", error);
                setError("Unable to remove student.");
            });
    }

    return (
        <div>
            {error ? <p>{JSON.stringify(error)}</p> : null}
            <h1>College Day Detail</h1>
            <p>College Day ID: {collegeDayId}</p>
            <p>College Date: {date}</p>
            <p>Semester: {semesterYear} {semesterYear}</p>
            <p>Course: {courseCode} {courseName}</p>
            <p>Lecturer: {lecturerFirstName} {lecturerLastName}</p>
            <h2>Enrolled Students and Attended:</h2>
            {attendStudents.map((studentId, index) => (
                <div key={index}>
                    <StudentName id={studentId}/>
                    {userInfo && (userInfo.user_group === 'admin' || userInfo.user_group === 'lecturer') ? (
                        <button onClick={() => removeStudent(studentId)} className={'btn btn-danger'}>
                            Absent
                        </button>
                    ) : null}
                </div>
            ))}

            <h2>Available Students to Mark Present:</h2>
            <p>Please Click Button to fetch the List
                <button onClick={filterStudents} className={'btn btn-success'}>Get Students List</button>
            </p>
            <div>
                {absentStudents.map(studentId => (
                    <div key={studentId}>
                        <StudentName id={studentId}/>
                        {userInfo && (userInfo.user_group === 'admin' || userInfo.user_group === 'lecturer') && (
                            <button onClick={() => addStudent(studentId)} className={'btn btn-primary'}>
                                Mark Present
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <p></p>
            <button onClick={handleBackToClassList} className={'btn btn-primary'}>Back to College Day List</button>
        </div>
    );
}

export default CollegeDayDetail;
