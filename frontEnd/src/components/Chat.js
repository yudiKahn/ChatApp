import React, { useEffect, useRef, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('/');

function Chat({state}) {
    const {userName} = useParams();
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState("");
    const initChats = useRef((bool)=>{});
    initChats.current = (flag) => flag && axios.get(`/api/chats/${state.user.userName}/${userName}`)
    .then(d=>setChats(d.data.chats));

    useEffect(()=>{
        initChats.current(chats.length === 0);
        socket.on('chatback', ()=> initChats.current(true));
    },[state.user,socket]);

    const sendMsg = () => {
        if(msg.length>0){
            socket.emit('chat', {
                sender:state.user.userName,
                reciver:userName,
                txt:msg
            });
            setMsg("");
        }
    }

    const refresh = () => {
        axios.get(`/api/chats/${state.user.userName}/${userName}`)
        .then(d=>setChats(d.data.chats));
    }

    return (<div className="container content">
        <div className="row" style={{justifyContent:'center'}}>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="card">
                    <div className="card-header">
                        {state.user.userName} Chat's - 
                        <span className="badge badge-pill badge-light" style={{cursor:'pointer'}} onClick={refresh}>Refresh</span>
                    </div>
                    <div className="card-body height3">
                        <ul className="chat-list">
                            {
                                chats.sort((a,b)=>a.time-b.time).map((v,i,arr)=><> 
                                {(i===0 || new Date(v.time).getDay() > new Date(arr[i-1].time).getDay()) && 
                                <li className="text-dark text-center bg-light">
                                    {new Date(v.time).toISOString().split('T')[0]}    
                                </li>}
                                <li key={i} className={v.reciver==userName?'in':'out'}>
                                    <div className="chat-img">
                                        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                                    </div>
                                    <div className="chat-body">
                                        <div className="chat-message">
                                            <h5>
                                                {v.sender}&nbsp;&nbsp;
                                                <small style={{fontSize:8}}>
                                                    {new Date(v.time).getHours()}:{new Date(v.time).getMinutes()}
                                                </small>
                                            </h5>
                                            <p>{v.txt}</p>
                                        </div>
                                    </div>
                                </li></>)
                            }
                        </ul>
                    </div>
                    <div className="row mx-0">
                        <div className="col-9">
                            <input className="form-control" value={msg} onChange={e=>setMsg(e.target.value)}/>
                        </div>
                        <button className="btn btn-dark col-3" onClick={sendMsg}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);

}

export default Chat
