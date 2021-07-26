import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './routes/Login/Login';
import OAuth from './routes/OAuth/OAuth';

const Auth = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/oauth">
        <OAuth />
      </Route>
    </Switch>
  )
}

export default Auth;
