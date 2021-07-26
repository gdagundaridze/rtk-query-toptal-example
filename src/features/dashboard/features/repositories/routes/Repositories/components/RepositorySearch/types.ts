import { RepositoryVisibilityEnum } from '../../../../../../../../api/github/repository/enums';
import { RepositorySearchArgs } from '../../../../../../../../api/github/repository/types';

export type RepositorySearchFormValues = {
  name: string;
  type: RepositoryVisibilityEnum;
} & Required<Pick<RepositorySearchArgs, 'sort' | 'per_page' | 'page'>>
