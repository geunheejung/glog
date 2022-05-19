import { toast } from 'react-toastify';
import { IAuth, QueryKey, storageItem, StorageKey, user } from 'api/sign';
import { useQuery } from 'react-query';
import { queryClient } from 'index';

const useUser = () => {
  const { value: userId } = storageItem(StorageKey.UserId);
  const query = useQuery([QueryKey.User, userId], user, {
    retry: 0,
    enabled: !!userId,
    onError: () => {
      toast('error');
    },
  });

  return query;
};

export default useUser;
