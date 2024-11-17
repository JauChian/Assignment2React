import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../constants";

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginstatus, setLoginstatus] = useState(false)
    const [token, setToken] = useState("")

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLoginstatus(true);
            setToken(localStorage.getItem('token'));
        }
    }, []);

    function usernameHandler(e) {
        setUsername(e.target.value)
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    function login() {
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseUrl+'api-token-auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLoginstatus(true);
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function logout() {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseUrl+'logout/',
            headers: {
                'Authorization': 'token '+token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLoginstatus(false);
                setToken("");
                localStorage.removeItem('token');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            {loginstatus === false ?
                <div>
                    <p>Username: <input type={'text'} name={'username'}
                                        onChange={usernameHandler}/></p>
                    <p>Password: <input type={'password'} name={'password'}
                                        onChange={passwordHandler}/></p>
                    <button onClick={login}>Login</button>
                </div>
                : <button onClick={logout}>Logout</button>

            }
        </div>
    );
}

export default Login;