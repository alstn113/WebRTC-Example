import AuthAPI from '~/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useLogout = (
  options: UseMutationOptionsOf<typeof AuthAPI.logout> = {},
) => {
  return useMutation(AuthAPI.logout, options);
};

export default useLogout;
