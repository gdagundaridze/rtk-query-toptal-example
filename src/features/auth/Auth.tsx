import React from 'react';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import Login from './routes/Login/Login';
import OAuth from './routes/OAuth/OAuth';

const Auth = () => {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/login" onlyPublic>
        <Login />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/oauth" onlyPublic>
        <OAuth />
      </AuthenticatedRoute>
    </Switch>
  )
}

export default Auth;
