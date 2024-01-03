import { FC, ChangeEvent, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { Video } from '../../class/Video';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const HeadLine1 = styled.h1`
  text-align: center;
`;

const Header = styled.div`
  max-width: 720px;
  margin: auto;
  border-bottom: 1px solid #ccc;
`;

const SearchForm = styled.div`
  max-width: 720px;
  margin: auto;
`;

const VideosList = styled.div`
  max-width: 720px;
  margin: auto;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 2s linear infinite;
`;

export const TopPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [videoList, setVideoList] = useState<Video[]>([]);

  useEffect(() => {
    getVideo();
  }, [keyword]);

  const getVideo = async () => {
    if (!keyword) {
      setVideoList([]);
      return;
    }

    try {
      // package.jsonでproxyで定義しておき、かつここを相対URLにしておくことでCORSのエラーが発生しない
      // 直書きでhttp://localhost:3000/api・・とかくとCORSエラーが発生

      // 分割代入 APIのレスポンスが以下のようになっているがdataのitemsとnextPageTokenだけ欲しいため
      // config
      // data:{items, nextPageToken}
      // headers
      // request
      // status
      const {
        data: { items, nextPageToken },
      } = await axios.get(`/api/videos/search/${keyword}`);
      // console.dir(items, { depth: null });
      setVideoList(items);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setVideoList([]);
    }
  };

  return (
    <>
      <Loading />
      <Wrapper>
        <HeadLine1> This is Top page!</HeadLine1>
        <Header>header</Header>
        <SearchForm>
          <input value={keyword} onChange={(e) => setKeyword(e.currentTarget.value)} />
          <button onClick={() => getVideo()}>検索</button>
        </SearchForm>
        {videoList && (
          <VideosList>
            {videoList.map((video: Video) => (
              <li key={video.id}>
                <h3>{video.snippet.title}</h3>
                <div>{video.snippet.description}</div>
              </li>
            ))}
          </VideosList>
        )}
      </Wrapper>
    </>
  );
};
