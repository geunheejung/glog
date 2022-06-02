import React from 'react';
import { useLogout } from 'hooks/useAuth';
import './styles.css';

interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const MyMenu: React.VFC<IProps> = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  const logoutMutate = useLogout();

  const onLogout = () => {
    logoutMutate();
    toggleModal();
  };

  return (
    <div className="my-menu-modal">
      <ul className="my-menu">
        <a>내 벨로그</a>
        <a>임시 글</a>
        <a>읽기 목록</a>
        <a>설정</a>
        <a onClick={onLogout}>로그아웃</a>
      </ul>
    </div>
  );
};

export default MyMenu;
