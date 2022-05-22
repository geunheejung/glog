import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import validator from 'email-validator';
import useInput from 'hooks/useInput';
import { useLogin } from 'hooks/useAuth';
import './styles.css';

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
}

const Login: React.VFC<Props> = ({ isOpen = false, toggleModal }) => {
  const [id, setId, handleId] = useInput();
  const [pw, setPw, handlePw] = useInput();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    return () => {
      setPw('');
    };
  }, [isOpen]);

  const success = () => {
    toggleModal();
  };

  const loginMutate = useLogin(success);

  const validateId = useCallback(() => {
    if (id.length <= 0 || !validator.validate(id)) {
      return;
    }

    setIsValidated(true);
    return true;
  }, [id]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const _isValidated = validateId();

      if (!_isValidated) return;
      loginMutate({ id, pw });
    },
    [id, pw]
  );

  return (
    <Modal isOpen={isOpen} className="access-modal">
      <article className="left-block"></article>
      <article className="right-block">
        <div className="exit-wrap">
          <svg
            onClick={toggleModal}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
        <section className="content">
          <h2>로그인</h2>

          <h4>이메일로 로그인</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="이메일을 입력하세요."
              value={id}
              onChange={handleId}
            />
            <input
              type="text"
              placeholder="비밀번호를 입력하세요."
              value={pw}
              onChange={handlePw}
            />
            <button>로그인</button>
          </form>
        </section>
      </article>
    </Modal>
  );
};

export default Login;