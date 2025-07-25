import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaPassport } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button } from "react-bootstrap";

import './RS.css';

function Login() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSumbitting, setSubmit] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmitLogin = async (err) => {
        err.preventDefault();
        setSubmit(true);

        if (!username || !password) {
            alert('Please wok put your username or password, Im not stupid');
            setSubmit(false);
            return;
        };
            
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/login', {
                username: username,
                password: password
            });


            await new Promise(resolve => setTimeout(resolve, 2000));

            setUsername('');
            setPassword('');

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);

                navigate('/Home');
            } else {
                return alert('login failed');
            }

            alert( res.data.message || 'Login Success');
            

        } catch (err) {
            if (
                err.response &&
                err.response.status === 401 &&
                err.response.data.message == 'User not Registered'
            ) {
                alert(err.response.data.message);
                return;
            };
            alert('Server Shutdown')
        } finally {
            setSubmit(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !email || !password) return alert('Please enter all fields');

        try {
            

            const res = await axios.post('http://127.0.0.1:5000/api/register', {
                username: username,
                email: email,
                password: password
            });
            setUsername('');
            setEmail('');
            setPassword('');

            alert(res.data.message || 'user registered');
        } catch (err) {
            console.error(err);
            alert('Failed to register');
        }
    };

    const [regisVisible, setRegisVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(true);

    useEffect(() => {
        document.body.classList.add('body');
    }, []);

    const handleClickRegis = () => {
        setLoginVisible(false);
        setRegisVisible(true);
    
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleClickLogin = () => {
        setLoginVisible(true);
        setRegisVisible(false)
    
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <> 
                    <div className='parent-container'>
                {/* Login Container */}
                {loginVisible && (
                    <div className={loginVisible ? "login-container" : "hidden"}>
                    
                    <form className='login' onSubmit={handleSubmitLogin}>
                        <div className='titles mt-3'>Login</div>
                        <div className='input-group'>
                            <input
                            type="text"
                            className='placeholder'
                            autoComplete='off'
                            placeholder='username'
                            id="username"
                            onChange={e => setUsername(e.target.value)}
                        /> <FaUser className='icon-user'/>
                        </div>
                        
                        <div className='input-group'>
                            <input 
                            type='password'
                            className='placeholder'
                            autoComplete='off'
                            placeholder='Password'
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                        /> <FaLock className="icon-user"/>
                        </div>
                        <div className='flex'>
                        <Button variant='primary' 
                        className='btn-sh d-flex justify-content-center align-items-center' 
                        type='submit'
                        disabled={isSumbitting}
                        >Login</Button>
                    </div>
                    </form>
                    
                </div>
                )}

                {/* register container */}
                {regisVisible && (
                <div className={regisVisible ? 'regis-container' : "hidden"}>
                    <div className='titles'>Register</div>
                    <form className='regis' onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input
                            type="text"
                            className='placeholder'
                            autoComplete='off'
                            placeholder='Username'
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        /> <FaUser className='icon-user'/>
                        </div>
                        <div className='input-group'>
                            <input 
                            type="email"
                            className='placeholder'
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        /> <MdEmail className='icon-user'/>
                        </div>
                        <div className='input-group'>
                            <input 
                            type='password'
                            className='placeholder'
                            placeholder='Password'
                            autoComplete='off'
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        /> <FaLock className='icon-user'/>
                        </div>
                        <Button variant="primary" 
                        className='btn-sh d-flex justify-content-center align-items-center' 
                        type='submit'
                        >Register</Button>
                    </form>
                    
                </div>
                )}
                
                { loginVisible && (
                    <div className={loginVisible ? 'registering' : 'hidden'}>Don't have account? <a className="clr-white" onClick={handleClickRegis}> Register</a></div>
                )}
                { regisVisible && (
                    <div className={regisVisible ? 'loginin' : 'hidden'}>Already have account?<a className="clr-white" onClick={handleClickLogin}> Sign in</a></div>
                )}
            </div>
        </>
    )
};

export default Login;