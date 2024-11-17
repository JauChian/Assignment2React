import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useEffect, useState} from "react";
import {baseUrl} from "../constants";
import axios from "axios";
import {Link} from "react-router-dom";

function Menu() {

    const [token, setToken] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [error, setError] = useState("")
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
                    setError("Failed to fetch user info");
                });
        }

    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Attendance System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href={'/login'}>Login</Nav.Link>
                        {userInfo ? (
                            userInfo.is_superuser || (userInfo.groups && userInfo.groups.includes('admin')) ? (
                                <>
                                    {/* 仅管理员和超级用户可见的部分 */}
                                    <Nav.Link href="/courses">Course</Nav.Link>
                                    <Nav.Link href="/semesters">Semester</Nav.Link>
                                    <Nav.Link href="/collegedays">College Day</Nav.Link>
                                    <Nav.Link href="/classes">Class</Nav.Link>
                                    <Nav.Link href="/lecturers">Lecturer</Nav.Link>
                                    <Nav.Link href="/students">Student</Nav.Link>
                                </>
                            ) : (
                                    <p>Not Admin</p>
                            )
                        ) : (
                            <p>No user information</p>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;