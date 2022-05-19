import { useCallback } from 'react';

const commonHandler = () => {};

const defaultHandler = () => {};

const errorHandler401 = () => {};

const errorHandler500 = () => {};

interface IDefault {
  [code: number]: () => void;
  default: typeof defaultHandler;
  common: typeof commonHandler;
}

const defaultHandlers: IDefault = {
  common: commonHandler,
  default: defaultHandler,
  401: errorHandler401,
  500: errorHandler500,
};

const useApiError = () => {
  const handleError = useCallback((error: Response) => {
    const { status } = error;
    const handler = defaultHandlers[status];

    switch (true) {
      case !!handler:
        handler();
        break;
      default:
        defaultHandlers.default();
    }

    defaultHandlers.common();
  }, []);

  return { handleError };
};

export default useApiError;
