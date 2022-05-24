import { useMutation } from 'react-query';
import { CookieKey, login, logout, storageItem, StorageKey } from 'api/sign';
import { toast } from 'react-toastify';
import moment from 'moment';
import Cookies from 'js-cookie';

export const useLogin = (success: () => void) => {
  const { mutate } = useMutation(login, {
    onSuccess: res => {
      const { accessToken, refreshToken, userId } = res.data;

      storageItem(StorageKey.AccessToken, accessToken);
      storageItem(StorageKey.Expired, moment().add(2, 'hours').valueOf());
      storageItem(StorageKey.UserId, userId);
      Cookies.set(CookieKey.RefreshToken, refreshToken, { expires: 7 });

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
      toast.success('로그아웃');
    },
  });

  return mutate;
};
