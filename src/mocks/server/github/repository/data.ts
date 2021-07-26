import fixtures from '@octokit/fixtures';
import * as faker from 'faker';
import { uniqueString } from '../../../../../test/utils/unique';
import { repositorySearchFormDefaultValues } from '../../../../features/dashboard/features/repositories/routes/Repositories/components/RepositorySearch/RepositorySearchFormContext';

const repositoryFixture = fixtures.get('api.github.com/get-repository')[0].response;
export const repositoryMockApiData = {
  repository: {
    search: {
      name: [{
        ...repositoryFixture,
        id: faker.datatype.uuid(),
        name: uniqueString(faker.name.title()),
        private: faker.datatype.boolean()
      }],
      visibility: [{
        ...repositoryFixture,
        id: faker.datatype.uuid(),
        name: uniqueString(faker.name.title()),
        private: true
      }],
    },
    sort: [{
      ...repositoryFixture,
      id: faker.datatype.uuid(),
      name: uniqueString(faker.name.title()),
      private: true
    }],
    base: Array.from(Array(repositorySearchFormDefaultValues.per_page * 3)).map(() => {
      return {
        ...repositoryFixture,
        id: faker.datatype.uuid(),
        name: uniqueString(faker.name.title())
      }
    })
  }
}
