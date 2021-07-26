import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../auth/components/AuthenticatedRoute/AuthenticatedRoute';
import Repositories from './features/repositories/Repositories';

const Dashboard = () => {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/">
        <Redirect to="/repositories" />
      </AuthenticatedRoute>
      <Repositories />
    </Switch>
  );
};

export default Dashboard;
