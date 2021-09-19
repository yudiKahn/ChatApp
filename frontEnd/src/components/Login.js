import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Login({onLogin}) {
    const onSubmit = e => {
        e.preventDefault();
        let obj = {};
        let fd = new FormData(e.target);
        fd.forEach((v,k)=> obj[k]=v);
        axios.post('/api/user/login', obj).then(d=>onLogin(d.data.user));
    }
    return (
        <div className="form text-center">
            <h1>LOGIN</h1>
            <form onSubmit={onSubmit}>
                <input className="form-control my-2" type="text" name="userName" placeholder="UserName"/>
                <input className="form-control my-2" type="password" name="password" placeholder="Password"/>
                <button className="btn btn-dark" type="submit">Login</button>
                <Link to="/Register" className="btn btn-outline-dark">Register</Link>
            </form>
        </div>
    )
}

export default Login
