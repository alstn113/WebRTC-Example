import UserAPI from '~/lib/api/user';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const userGetMe = (options: UseQueryOptionsOf<typeof UserAPI.getMe> = {}) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['GetMe'];
const fetcher = () => async () => await UserAPI.getMe();

userGetMe.getKey = getKey;
userGetMe.fetcher = fetcher;

export default userGetMe;
