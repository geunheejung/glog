import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import validator from 'email-validator';
import useInput from 'hooks/useInput';
import { useLogin, useSignUp } from 'hooks/useAuth';
import './styles.css';

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
}

const Login: React.VFC<Props> = ({ isOpen = false, toggleModal }) => {
  const FORM_INDEX = {
    Login: 0,
    SignUp: 1,
  };

  const [nickname, setNickname, handleNickname] = useInput();
  const [email, setEmail, handleEmail] = useInput();
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
      setEmail('');
      setPw('');
    };
  }, [isOpen]);

  const success = () => {
    setCurrentFormIndex(FORM_INDEX.Login);
    setPw('');
    setNickname('');
  };

  const loginMutate = useLogin(() => {
    toggleModal();
  });

  const signUpMutate = useSignUp(success);

  const validate = useCallback(() => {
    if (email.length <= 0 || !validator.validate(email)) {
      toast.warn('이메일 양식이 잘못됐습니다.');
      return false;
    }

    return true;
  }, [email]);

  const loginFlow = useCallback(() => {
    loginMutate({ email: email, pw });
  }, [email, pw]);

  const signUpFlow = useCallback(() => {
    if (!nickname) return;

    signUpMutate({ nickname, email: email, pw });
  }, [nickname, email, pw]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const isValidated = validate();
      setIsValidated(isValidated);

      if (!isValidated) return;

      if (currentFormIndex === FORM_INDEX.Login) loginFlow();
      else signUpFlow();
    },
    [email, pw, currentFormIndex]
  );

  const toggleForm = useCallback(() => {
    const { SignUp, Login } = FORM_INDEX;
    setCurrentFormIndex(currentFormIndex === Login ? SignUp : Login);
  }, [currentFormIndex]);

  const { title, subTitle, submit } = formText[currentFormIndex];
  const { SignUp, Login } = FORM_INDEX;
  const isEmailValidated = isValidated && currentFormIndex === SignUp;
  const isLoginForm = currentFormIndex === Login;

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
              value={email}
              onChange={handleEmail}
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
            {isLoginForm
              ? '아직 회원이 아니신가요?'
              : '계정이 이미 있으신가요?'}
            <button onClick={toggleForm}>
              {isLoginForm ? '회원가입' : '로그인'}
            </button>
          </p>
        </section>
      </article>
    </Modal>
  );
};

export default Login;
