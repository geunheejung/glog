import { useCallback } from 'react';
import { toast } from 'react-toastify';

const defaultHandler = () => {
  toast.warn('재시도 해주세요.');
};

const errorHandler401 = () => {
  toast.warn('다시 로그인 해주세요.');
};

const errorHandler500 = () => {
  toast.warn('서버에 문제가 있습니다.');
};

interface IHandler {
  [code: number]: () => void;
  default: typeof defaultHandler;
}

const handlers: IHandler = {
  '401': errorHandler401,
  '500': errorHandler500,
  default: defaultHandler,
};

const handleError = (error: Response) => {
  const { status } = error;
  const handler = handlers[status];

  if (!handler) {
    handlers.default();
    return;
  }

  handler();
};

export default handleError;
