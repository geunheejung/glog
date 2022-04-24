import React from 'react';
import gravatar from 'gravatar';
import './styles.css';

interface Props {
  title: string;
  banner: string;
  nickname: string;
  profile: string;
  content: string;
  date: string;
  review: number;
  like: number;
}

const Post: React.VFC<Props> = ({
  title,
  profile,
  banner,
  nickname,
  content,
  date,
  review,
  like,
}) => {
  return (
    <article className="post">
      <div className="banner">
        <img src={banner} />
      </div>
      <section className="content">
        <h4>{title}</h4>
        <div className="description">
          <p>{content}</p>
        </div>
        <div className="info">
          <span>{date}</span>
          <span className="separator">·</span>
          <span>{review}개의 댓글</span>
        </div>
      </section>
      <footer>
        <div className="userinfo">
          <img src={profile} alt="프로필" />
          <span>
            {`by `}
            <b>{nickname}</b>
          </span>
        </div>
        <div className="likes">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
            ></path>
          </svg>
          {like}
        </div>
      </footer>
    </article>
  );
};

export default Post;
