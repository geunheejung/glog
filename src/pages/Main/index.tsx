import React from 'react';
import Post from 'components/Post';
import './styles.css';

const row = {
  title: '๐ ์น๊ณผ HTML&CSS์์ ๋์น๊ธฐ ์ฌ์ด ๊ฐ๋๋ค',
  nickname: 'dramatic',
  profile: `https://velog.velcdn.com/images/koeunyeon/profile/7553dedc-76e4-49ab-a0d7-b9ad5afa2d5c/IMG_3952.jpeg`,
  content:
    '๊ณผ์ฐ ๊ทธ๋ด๊น...!?์ฒ์ ์น ๊ฐ๋ฐ ๊ณต๋ถ๋ฅผ ์์ํ๊ณ  ๋จผ์  ๋ฐฐ์ฐ๋ ๊ฒ์ด html, css์ ๊ธฐ๋ณธ์ ์ธ ๋ด์ฉ๋ค์ด๋ค. ๋์ผ๋ก ๋ฐ๋ก ๋ณด์ด๊ณ  ๊ฐ๋จํ๊ฒ ์น์ ์ค๊ณํ๊ณ  ๊พธ๋ฐ ์ ์์ด์ ์ ๊ทผ๊ฐ๋ฅ์ฑ์ด ๋ฎ๋ค๊ณ  ์๊ฐํ๋ค. ์ฆ ์ง์์ฅ๋ฒฝ์ด ๋ฎ์๋ฐ, ๊ทธ๋์ ๋ง์ด๋ค ์ด ๋ถ๋ถ์ ํฅ๋ฏธ๋กญ๊ฒ ๊ณต๋ถํ๋ค(์๋ฐ',
  date: `2022๋ 4์ 3์ผ`,
  banner: `https://velog.velcdn.com/cloudflare/zerone/329cc279-f5f2-485b-b6d8-d6b7a291ca4d/htmlcssjs.png`,
  review: 10,
  like: 70,
};
const mock = Array(10).fill(row);

const Main: React.VFC = () => {
  return (
    <div className="post-wrap r-grid">
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
    </div>
  );
};

export default Main;
