import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './home.css';

function Home() {

    const [message, setMessage] = useState('Loading...');
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('No token found. Please login.');
            return;
        }

        axios.get('http://localhost:5000/api/dashboard', {
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setMessage('You have been logged out.');

        navigate('/')
    };
    return (
        <Fragment>
            <main>
                <section className='parent-container-home'>
                    <div className='container-home'>
                        <div className='container'>{message}</div>
                        <div className='container-btn'>
                            <Button className='btn-log' variant='primary' onClick={handleLogout}>Logout </Button>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment>
    );
}

export default Home;
