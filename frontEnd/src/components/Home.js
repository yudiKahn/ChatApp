import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home({state}) {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get('/api/users').then(d=>setUsers(d.data.users));
    },[]);

    return (<div className="container">
        <table className="table table-striped">
            <tbody>
            {
                users.map((v,i)=> v.userName != state.user.userName && <tr key={i}>
                    <td>
                        <img style={{width:60,borderRadius:'50%'}} src="https://bootdey.com/img/Content/avatar/avatar7.png"/>
                    </td>
                    <td>
                        <Link to={`/Chat/${v.userName}`}>{v.userName}</Link>
                    </td>
                </tr>)
            }
            </tbody>
        </table>
    </div>)
   }

export default Home;