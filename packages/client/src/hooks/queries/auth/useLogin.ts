import AuthAPI from '~/libs/api/auth';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useLogin = (options: UseMutationOptionsOf<typeof AuthAPI.login> = {}) => {
  return useMutation(AuthAPI.login, options);
};

export default useLogin;
