import React, {useState, useContext} from 'react';
import {BrowserRouter, Switch, Route, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext'

import './AuthPage.scss'

const AuthPage = () => {
    
    const history = useHistory(); 

    const [errLog, setErrLog] = useState(false);
    const [errReg, setErrReg] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const regHandler = async () => {
        try {
            await axios.post('https://txtnote.herokuapp.com/api/auth/reg', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch(e) {
            console.log(e);
            setErrReg(true);
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('https://txtnote.herokuapp.com/api/auth/log', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                login(response.data.token, response.data.userId)
            })
        } catch(e) {
            console.log(e);
            setErrLog(true);
        }
    }

    return (
       <BrowserRouter>
            <Switch>
                <React.Fragment>
                <div className="container">
                    <Route path="/log">
                        <div className="authPage">
                            <h3>Log in</h3>
                            <form className="form form_login" onSubmit={e => e.preventDefault()}>
                                <div className="input__wrapper">
                                    <label htmlFor="email">Email</label>
                                    <div className="input">
                                        <input 
                                            type="email" 
                                            name="email"
                                            required 
                                            onChange={changeHandler}/>
                                    </div>
                                </div>
                                <div className="input__wrapper">
                                    <label htmlFor="password">Password</label>
                                    <div className="input">
                                        <input 
                                            type="password" 
                                            name="password" 
                                            required 
                                            onChange={changeHandler}/>
                                    </div>
                                </div>
                                <div className="auth__wrapper">
                                    <button className="btn_auth" onClick={loginHandler}>Login</button>
                                    <Link to="/reg" className="registration">New User?</Link>
                                </div>
                            </form>

                            {errLog ? (
                            <div className="error">
                                <p><b>Authorization error</b>. Please enter the correct data or create a new user.</p>
                            </div>
                            ) : null}

                        </div>
                    </Route>

                    <Route path="/reg">
                        <div className="authPage">
                            <h3>Create a new User</h3>
                            <form className="form form_login" onSubmit={e => e.preventDefault()}>
                                <div className="input__wrapper">
                                    <label htmlFor="email">Email</label>
                                    <div className="input">
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            onChange={changeHandler}/>
                                    </div>
                                </div>
                                <div className="input__wrapper">
                                    <label htmlFor="password">Password</label>
                                    <div className="input">
                                        <input 
                                            type="password" 
                                            name="password" 
                                            required 
                                            onChange={changeHandler}/>
                                    </div>
                                </div>
                                <div className="auth__wrapper">
                                    <button className="btn_auth" onClick={regHandler}>Sign up</button>
                                    <Link to="/log" className="registration">Already registered?</Link>
                                </div>
                            </form>
                            {errReg ? (
                            <div className="error">
                                <p><b>Registration error</b>. The user already exists or incorrect data is entered. Check the Email address you entered and make sure that the password contains at least 6 characters.</p>
                            </div>
                            ) : null}
                        </div>
                    </Route>
                </div>
            </React.Fragment>

            </Switch>
       </BrowserRouter>
    );
};

export default AuthPage;