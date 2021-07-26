import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import FullscreenProgress from '../../../../shared/components/FullscreenProgress/FullscreenProgress';
import AuthenticatedRoute from '../../../auth/components/AuthenticatedRoute/AuthenticatedRoute';

const RepositoriesRoute = React.lazy(() => import('./routes/Repositories/Repositories'));
const CommitsRoute = React.lazy(() => import('./routes/Commits/Commits'));
const Repositories = () => {
  return (
    <Suspense fallback={<FullscreenProgress />}>
      <Switch>
        <AuthenticatedRoute exact path="/repositories">
          <RepositoriesRoute />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/repositories/:repositoryName">
          <CommitsRoute />
        </AuthenticatedRoute>
      </Switch>
    </Suspense>
  );
};

export default Repositories;
