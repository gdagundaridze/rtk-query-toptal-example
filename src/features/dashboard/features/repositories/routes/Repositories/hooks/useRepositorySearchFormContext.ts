import { useFormikContext } from 'formik';
import { RepositorySearchFormValues } from '../components/RepositorySearch/types';

export const useRepositorySearchFormContext = () => {
  return useFormikContext<RepositorySearchFormValues>();
}
