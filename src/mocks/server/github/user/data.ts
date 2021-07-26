import * as faker from 'faker';
import { User } from '../../../../api/github/user/types';

export const userMockApiData = {
  user: {
    login: faker.internet.userName()
  } as User,
}
