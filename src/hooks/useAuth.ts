import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {
  CookieKey,
  login,
  logout,
  QueryKey,
  storageItem,
  StorageKey,
  updateToken,
} from 'api/sign';
import queryClient from 'queryClient';

export const useLogin = (success: () => void) => {
  const { mutate } = useMutation(login, {
    onSuccess: res => {
      const { accessToken, refreshToken, userId } = res.data;

      updateToken(accessToken);
      storageItem(StorageKey.UserId, userId);
      Cookies.set(CookieKey.RefreshToken, refreshToken, { expires: 14 });

      toast.success('로그인');
      success();
    },
    onError: () => {
      toast.error('로그인 실패');
    },
  });

  return mutate;
};

export const useLogout = () => {
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      Cookies.remove(CookieKey.RefreshToken);
      window.localStorage.clear();
      queryClient.resetQueries(QueryKey.User);
      toast.success('로그아웃');
    },
  });

  return mutate;
};
