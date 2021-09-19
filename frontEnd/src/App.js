import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom';
import {Chat, FourOFour, Home, Login, Register} from './components';

export default function App() {
  const [state, setState] = useState({
    user:{},
  });

  useEffect(()=>{
    if(localStorage.getItem('user'))
      setState({user:JSON.parse(localStorage.getItem('user'))});
  },[]);

  const onLogin = (user)=>{
    setState({user});
    localStorage.setItem('user',JSON.stringify(user));
  }

  return (<Router>
      {state.user && <button onClick={()=>{
        localStorage.removeItem('user');
        setState({user:null});
      }}>LOGOUT</button>}
      <Switch>
        <Route exact path="/">
        {
          state.user ? <Home state={state}/> : <Login onLogin={onLogin}/>
        }  
        </Route>       
        <Route exact path="/Register" render={()=><Register state={state} onRegister={onLogin}/>}/>
        <Route exact path="/Chat/:userName">
          <Chat state={state}/>
        </Route>
        <Route exact path="/about">
          About
        </Route>
        <Route component={FourOFour}/>
      </Switch>
  </Router>);
}