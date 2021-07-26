import fixtures from '@octokit/fixtures';
import * as faker from 'faker';
import { uniqueString } from '../../../../../test/utils/unique';
import { RepositoryCommit } from '../../../../api/github/repository/types';
import { repositorySearchFormDefaultValues } from '../../../../features/dashboard/features/repositories/routes/Repositories/components/RepositorySearch/RepositorySearchFormContext';

const repositoryFixture = fixtures.get('api.github.com/get-repository')[0].response;
const commitFixture = {
  node_id: faker.datatype.uuid(),
  commit: {
    message: faker.lorem.words(5),
    author: {
      name: faker.internet.userName(),
      date: faker.date.recent().toString(),
    }
  },
  author: {
    avatar_url: faker.internet.avatar(),
  }
} as RepositoryCommit;
const branchFixture = {
  name: faker.lorem.word(),
};
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
  },
  commit: {
    search: {
      branch: [{
        ...commitFixture,
        node_id: faker.datatype.uuid(),
        commit: {
          ...commitFixture.commit,
          message: uniqueString(faker.lorem.words(5)),
        }
      }]
    },
    base: Array.from(Array(5 * 3)).map(() => {
      return {
        ...commitFixture,
        node_id: faker.datatype.uuid(),
        commit: {
          ...commitFixture.commit,
          message: uniqueString(faker.lorem.words(5)),
        }
      }
    })
  },
  branch: {
    base: Array.from(Array(5 * 3)).map(() => {
      return {
        ...branchFixture,
        name: uniqueString(faker.lorem.word()),
      }
    })
  }
}
