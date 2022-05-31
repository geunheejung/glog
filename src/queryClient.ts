import { QueryCache, QueryClient } from 'react-query';
import handleError from 'api/handleError';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      if ('response' in err) {
        handleError(err.response);
      }
    },
  }),
});

export default queryClient;
