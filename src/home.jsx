import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

function Home() {

    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('No token found. Please login.');
            return;
        }

        axios.get('http://localhost:5000/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setMessage(response.data.message);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage('Unauthorized. Please login again.');
                } else if (error.response.status === 403) {
                    setMessage('Session expired. Please login again.');
                } else {
                    setMessage('An error occurred: ' + error.response.data.message);
                }
            } else {
                setMessage('Server not responding.');
            }
        });
    }, []);

    return (
        <Fragment>
            <main>
                <section className='parent-container-home'>
                    <div className='container-home'>{message}</div>
                </section>
            </main>
        </Fragment>
    );
}

export default Home;
