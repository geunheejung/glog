import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import validator from 'email-validator';
import useInput from 'hooks/useInput';
import { useLogin } from 'hooks/useAuth';
import './styles.css';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
}

const Login: React.VFC<Props> = ({ isOpen = false, toggleModal }) => {
  const FORM_INDEX = {
    Login: 0,
    SignUp: 1,
  };

  const [nickname, , handleNickname] = useInput();
  const [id, , handleId] = useInput();
  const [pw, setPw, handlePw] = useInput();
  const [isValidated, setIsValidated] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(FORM_INDEX.Login);

  const formText = [
    {
      title: '로그인',
      subTitle: '이메일로 로그인',
      submit: '로그인',
    },
    {
      title: '회원가입',
      subTitle: '이메일로 회원가입',
      submit: '회원가입',
    },
  ];

  useEffect(() => {
    return () => {
      setPw('');
    };
  }, [isOpen]);

  const success = () => {
    toggleModal();
  };

  const loginMutate = useLogin(success);

  const validate = useCallback(() => {
    if (id.length <= 0 || !validator.validate(id)) {
      toast.warn('이메일 양식이 잘못됐습니다.');
      return false;
    }

    return true;
  }, [id]);

  const loginFlow = useCallback(() => {
    loginMutate({ id, pw });
  }, [id, pw]);

  const signUpFlow = useCallback(() => {
    console.log(1);
  }, [id, pw]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const isValidated = validate();
      setIsValidated(isValidated);

      if (!isValidated) return;

      if (currentFormIndex === FORM_INDEX.Login) loginFlow();
      else signUpFlow();
    },
    [id, pw]
  );

  const toggleForm = useCallback(() => {
    const { SignUp, Login } = FORM_INDEX;
    setCurrentFormIndex(currentFormIndex === Login ? SignUp : Login);
  }, [currentFormIndex]);

  const { title, subTitle, submit } = formText[currentFormIndex];
  const { SignUp, Login } = FORM_INDEX;
  const isEmailValidated = isValidated && currentFormIndex === SignUp;

  return (
    <Modal isOpen={isOpen} className="access-modal">
      <article className="left-block" />
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
          <h2>{title}</h2>

          <h4>{subTitle}</h4>
          <form onSubmit={handleSubmit}>
            {isEmailValidated && (
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={nickname}
                onChange={handleNickname}
              />
            )}
            <input
              type="text"
              placeholder="이메일을 입력하세요."
              value={id}
              onChange={handleId}
            />
            {(currentFormIndex === Login || isEmailValidated) && (
              <input
                type="text"
                placeholder="비밀번호를 입력하세요."
                value={pw}
                onChange={handlePw}
              />
            )}
            <button>{submit}</button>
          </form>
          <p className="sub-content">
            아직 회원이 아니신가요?{' '}
            <button onClick={toggleForm}>회원가입</button>
          </p>
        </section>
      </article>
    </Modal>
  );
};

export default Login;
