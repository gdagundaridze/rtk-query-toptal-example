import { act } from '@testing-library/react';
import React from 'react';
import { awaitDataRender, getDataByPageIndex } from '../../../../../../../../../test/routes/commits';
import { arrangeCommitsRoute } from '../../Commits.test';


describe('Route/CommitsGrid', () => {
  it('should render initial data only', async () => {
    act(() => {
      arrangeCommitsRoute();
    })

    await awaitDataRender(getDataByPageIndex(0));
  });
});

