import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import StudentName from "../Student/StudentName";

function ClassDetail(props) {
    const location = useLocation();
    const {id} = location.state;
    const [classId, setClassId] = useState("");
    const [classNumber, setClassNumber] = useState("");
    const [semesterName, setSemesterName] = useState("");
    const [semesterYear, setSemesterYear] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [lecturerFirstName, setLecturerFirstName] = useState("");
    const [lecturerLastName, setLecturerLastName] = useState("");
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [availableStudents, setAvailableStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);

    useEffect(() => {
        Promise.all([getClassInfo(), getAllStudents()]).then(() => {
            filterStudents();
        });
    }, []);


    function getClassInfo() {
        // 获取班级信息
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setClassId(response.data.id);
                setClassNumber(response.data.number);
                setSemesterName(response.data.semester_name);
                setSemesterYear(response.data.semester_year);
                setCourseCode(response.data.course_code);
                setCourseName(response.data.course_name);
                setLecturerFirstName(response.data.lecturer_first_name);
                setLecturerLastName(response.data.lecturer_last_name);
                setStudents(response.data.students);
                setError("");

            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    }

    function getAllStudents() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/students/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem('token')
            }
        };

        axios.request(config)
            .then((response) => {
                setAllStudents(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function filterStudents() {
        // 如果沒有已經註冊的學生，所有學生都應該是可用的
        if (students.length === 0) {
            setAvailableStudents(allStudents);
            return;
        } else {
            // 過濾掉已經註冊的學生
            const filteredStudents = allStudents.filter(student =>
                !students.includes(student.id) // 如果學生 ID 不在已註冊的學生列表中
            );
            setAvailableStudents(filteredStudents);
        }
    }


    function enrollStudent(studentId) {
        const updatedStudents = [...students, studentId];

        let data = {
            students: updatedStudents
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Student enrolled successfully:", response.data);
                setStudents(updatedStudents);
                setAvailableStudents(availableStudents.filter(student => student.id !== studentId));
            })
            .catch((error) => {
                console.error("Error enrolling student:", error);
                setError("Unable to enroll student.");
            });
    }

    function removeStudent(studentId) {
        const updatedStudents = students.filter(id => id !== studentId);

        let data = {
            students: updatedStudents
        };

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + 'api/classes/' + id + '/',
            headers: {'Authorization': 'token ' + localStorage.getItem('token')},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Student removed successfully:", response.data);
                setStudents(updatedStudents);
                const removedStudent = allStudents.find(student => student.id === studentId);
                setAvailableStudents([...availableStudents, removedStudent]);
            })
            .catch((error) => {
                console.error("Error removing student:", error);
                setError("Unable to remove student.");
            });
    }

    function handleBackToClassList() {
        navigate('/classes');
    }

    return (
        <div>
            {error ? <p>{error}</p> : null}

            <h1>Class Detail</h1>
            <p>Class ID: {classId}</p>
            <p>Class Number: {classNumber}</p>
            <p>Semester: {semesterYear} {semesterName}</p>
            <p>Course: {courseCode} {courseName}</p>
            <p>Lecturer: {lecturerFirstName} {lecturerLastName}</p>

            <h2>Enrolled Student List:</h2>
            {students.length === 0 ? <p>No students enrolled yet.</p> : (
                students.map((studentId, index) => (
                    <div key={index}>
                        <StudentName id={studentId}/>
                        <button onClick={() => removeStudent(studentId)} className={'btn btn-danger'}>Remove</button>
                    </div>
                ))
            )}

            <h2>Available Students to Enroll:</h2>
            <div>
                {availableStudents.map(student => (
                    <div key={student.id}>
                        <p>
                            {student.first_name}{student.last_name}
                        </p>
                        <button onClick={enrollStudent.bind(this, student.id)} className={'btn btn-primary'}>
                            Enroll Student
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={filterStudents} className={'btn btn-primary'}>Get Students</button>

            <button onClick={handleBackToClassList} className={'btn btn-primary'}>Back to Class List</button>
        </div>
    );
}

export default ClassDetail;