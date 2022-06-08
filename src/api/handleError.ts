import { toast } from 'react-toastify';

const defaultHandler = () => {
  toast.warn('재시도 해주세요.');
};

const errorHandler400 = (error: any) => {
  if (error.data && error.data.message) {
    toast.warn(error.data.message);
  } else {
    toast.warn('잘못된 시도 입니다.');
  }
};

const errorHandler401 = () => {
  toast.warn('다시 로그인 해주세요.');
};

const errorHandler500 = () => {
  toast.warn('서버에 문제가 있습니다.');
};

interface IHandler {
  [code: number]: (error: any) => void;
  default: typeof defaultHandler;
}

const handlers: IHandler = {
  '400': errorHandler400,
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

  handler(error);
};

export default handleError;
