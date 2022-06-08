import { MutationCache, QueryCache, QueryClient } from 'react-query';
import handleError from 'api/handleError';

const onError = (err: any) => {
  queryClient.clear();
  queryClient.getMutationCache().clear();
  if ('response' in err) {
    handleError(err.response);
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError,
  }),
  mutationCache: new MutationCache({
    onError,
  }),
});

export default queryClient;
