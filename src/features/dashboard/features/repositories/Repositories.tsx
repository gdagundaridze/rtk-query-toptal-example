import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import FullscreenProgress from '../../../../shared/components/FullscreenProgress/FullscreenProgress';
import AuthenticatedRoute from '../../../auth/components/AuthenticatedRoute/AuthenticatedRoute';

const RepositoriesRoute = React.lazy(() => import('./routes/Repositories/Repositories'));
const Repositories = () => {
  return (
    <Suspense fallback={<FullscreenProgress />}>
      <Switch>
        <AuthenticatedRoute exact path="/repositories">
          <RepositoriesRoute />
        </AuthenticatedRoute>
      </Switch>
    </Suspense>
  );
};

export default Repositories;
