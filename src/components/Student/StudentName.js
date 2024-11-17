import React, { Fragment, useEffect, useState } from 'react';
import { baseUrl } from "../../constants";
import axios from "axios";

function StudentName(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${baseUrl}api/students/${props.id}/`,
                headers: {
                    'Authorization': `token ${token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                })
                .catch((error) => {
                    console.error("Error fetching student data:", error);
                });
        }
    }, [props.id]); // 将 props.id 作为依赖项

    return (
        <Fragment>
            {firstName} {lastName}
        </Fragment>
    );
}

export default StudentName;
