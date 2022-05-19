import { useMutation } from 'react-query';
import { login, logout, storageItem, StorageKey } from 'api/sign';
import { toast } from 'react-toastify';

export const useLogin = (success: () => void) => {
  const { mutate } = useMutation(login, {
    onSuccess: res => {
      const { accessToken, refreshToken, userId } = res.data;

      const ms = new Date().getTime() + 12000;

      storageItem(StorageKey.AccessToken, accessToken, ms);
      storageItem(StorageKey.RefreshToken, refreshToken, ms + 50000);
      storageItem(StorageKey.UserId, userId, ms);

      toast.success('로그인');
      success();
    },
    onError: err => {
      console.log(err);
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
