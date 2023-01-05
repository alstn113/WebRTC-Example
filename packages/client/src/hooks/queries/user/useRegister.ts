import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';
import UserAPI from '~/lib/api/user';

const useRegister = (options: UseMutationOptionsOf<typeof UserAPI.register> = {}) => {
  return useMutation(UserAPI.register, options);
};

export default useRegister;
