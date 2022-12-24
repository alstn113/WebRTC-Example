import AuthAPI from '~/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useRegister = (
  options: UseMutationOptionsOf<typeof AuthAPI.register> = {},
) => {
  return useMutation(AuthAPI.register, options);
};

export default useRegister;
