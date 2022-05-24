import React from 'react';
import Cookies from 'js-cookie';
import { CookieKey, storageItem, StorageKey } from 'api/sign';
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
    const userId = storageItem(StorageKey.UserId);

    if (!userId) return;

    window.localStorage.clear();
    Cookies.remove(CookieKey.RefreshToken);
    logoutMutate(userId);
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
