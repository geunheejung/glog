import React from 'react';
import Post from 'components/Post';
import './styles.css';
import Login from 'components/Post/Login';

const row = {
  title: '📌 웹과 HTML&CSS에서 놓치기 쉬운 개념들',
  nickname: 'dramatic',
  profile: `https://velog.velcdn.com/images/koeunyeon/profile/7553dedc-76e4-49ab-a0d7-b9ad5afa2d5c/IMG_3952.jpeg`,
  content:
    '과연 그럴까...!?처음 웹 개발 공부를 시작하고 먼저 배우는 것이 html, css의 기본적인 내용들이다. 눈으로 바로 보이고 간단하게 웹을 설계하고 꾸밀 수 있어서 접근가능성이 낮다고 생각한다. 즉 진입장벽이 낮은데, 그래서 많이들 이 부분은 흥미롭게 공부한다(자바',
  date: `2022년 4월 3일`,
  banner: `https://velog.velcdn.com/cloudflare/zerone/329cc279-f5f2-485b-b6d8-d6b7a291ca4d/htmlcssjs.png`,
  review: 10,
  like: 70,
};
const mock = Array(10).fill(row);

const Main: React.VFC = () => {
  return (
    <div className="post-wrap">
      <main>
        {mock.map((row, index) => (
          <Post
            key={index}
            title={row.title}
            banner={row.banner}
            nickname={row.nickname}
            profile={row.profile}
            content={row.content}
            date={row.date}
            review={row.review}
            like={row.like}
          />
        ))}
      </main>
      <Login isOpen />
    </div>
  );
};

export default Main;
