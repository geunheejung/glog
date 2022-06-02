import { QueryKey, storageItem, StorageKey, user } from 'api/sign';
import { useQuery } from 'react-query';

const useUser = () => {
  const userId = storageItem(StorageKey.UserId);
  const query = useQuery(QueryKey.User, user, {
    retry: 0,
    enabled: !!userId,
  });

  return query;
};

export default useUser;
