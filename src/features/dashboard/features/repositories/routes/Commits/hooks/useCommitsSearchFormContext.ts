import { useFormikContext } from 'formik';
import { CommitsSearchFormValues } from '../types';

export const useCommitsSearchFormContext = () => {
  return useFormikContext<CommitsSearchFormValues>();
}
