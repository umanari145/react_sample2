import { FC, ChangeEvent, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { Area } from '../../class/Area';

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
  list-style: none;
  li {
    margin-top: 10px;
  }
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
  const [zip, setZip] = useState<string>('');
  const [areaList, setAreaList] = useState<Area[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisps, setIsDisps] = useState<string[]>([]);

  useEffect(() => {
    getArea();
  }, [zip]);

  const getArea = async () => {
    if (!zip || zip.length < 5) {
      setAreaList([]);
      return;
    }

    setLoading(true);
    setIsDisps([]);
    try {
      // package.jsonでproxyで定義しておき、かつここを相対URLにしておくことでCORSのエラーが発生しない
      // 直書きでhttp://localhost:3000/api・・とかくとCORSエラーが発生

      // 分割代入 例えばAPIのレスポンスが以下のようになっているはdataのareasとstatusだけ欲しいため
      // config
      // {data, status}
      // headers
      // request
      // status
      const { data, status } = await axios.get(`/api/zip/${zip}`);
      // console.dir(items, { depth: null });
      // console.log(data);
      console.log(status);
      setAreaList(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setAreaList([]);
    }
    setLoading(false);
  };

  const handleMouseEnter = (area_id: string) => {
    // 本体に突っ込む
    setIsDisps([...isDisps, area_id]);
  };

  const handleMouseLeave = (area_id: string) => {
    // 自分を除去してセット
    setIsDisps(isDisps.filter((inc_area_id) => inc_area_id !== area_id));
  };

  return (
    <>
      {loading && <Loading />}
      <Wrapper>
        <HeadLine1> This is Top page!</HeadLine1>
        <Header>header</Header>
        <SearchForm>
          <div>
            郵便番号:
            <input value={zip} onChange={(e) => setZip(e.currentTarget.value)} />
          </div>
        </SearchForm>
        {areaList && (
          <VideosList>
            {areaList.map((area: Area) => (
              <li key={area._id}>
                <div
                  onMouseEnter={() => handleMouseEnter(area._id)}
                  onMouseLeave={() => handleMouseLeave(area._id)}
                >
                  {area.zip}
                </div>
                {isDisps.includes(area._id) && (
                  <div>
                    {area.pref} {area.city} {area.town} ({area.pref_kana} {area.city_kana}{' '}
                    {area.town_kana})
                  </div>
                )}
              </li>
            ))}
          </VideosList>
        )}
      </Wrapper>
    </>
  );
};
