import Reaat, { useCallback, useState, VFC } from 'react';
import './styles.css';

const Search: VFC = () => {
  const [value, setValue] = useState('');

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      /*
        1. value를 서버로 요청한다.
      */
    },
    [value]
  );

  return (
    <div className="search-wrapper">
      <form className="search-form">
        <svg width="17" height="17" viewBox="0 0 17 17">
          <path
            fill-rule="evenodd"
            d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
            clip-rule="evenodd"
            fill="currentColor"
          ></path>
        </svg>
        <input
          placeholder="검색어를 입력하세요"
          value={value}
          onChange={handleInput}
        />
      </form>
      <p className="result-info">
        총 <b>10000개</b>의 포스트를 찾았습니다.
      </p>
      <div className="result-list">
        <section>
          <div className="user-info"></div>
          <a className="thumbnail" href="" />
          <a className="title" href=""></a>
          <p className="summary"></p>
        </section>
      </div>
    </div>
  );
};

export default Search;
