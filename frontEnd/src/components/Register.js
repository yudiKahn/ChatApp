import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

function Register({onRegister, state}) {
    const onSubmit = e => {
        e.preventDefault();
        let obj = {};
        let fd = new FormData(e.target);
        fd.forEach((v,k)=>obj[k]=v);
        axios.post('/api/user/signup', obj).then(d=>onRegister(d.data.user));
    }

    if(state.user)
        return <Redirect to="/" state={state}/>
    return (
        <div className="form text-center">
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input className="form-control my-2" type="text" name="userName" placeholder="UserName"/>
                <input className="form-control my-2" type="password" name="password" placeholder="Password"/>
                <button className="btn btn-dark" type="submit">Register</button>
                <Link to="/" className="btn btn-outline-dark">Login</Link>
            </form>
        </div>
    )
}

export default Register
