import { toast } from 'react-toastify';
import { QueryKey, storageItem, StorageKey, user } from 'api/sign';
import { useQuery } from 'react-query';

const useUser = () => {
  const userId = storageItem(StorageKey.UserId);
  const query = useQuery([QueryKey.User, userId as string], user, {
    retry: 0,
    enabled: !!userId,
    onError: () => {
      toast('error');
    },
  });

  return query;
};

export default useUser;
