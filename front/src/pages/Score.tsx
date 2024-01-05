import { ChangeEvent, FC, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { MemberScore } from '../class/MemberScore';
import score from '../json/score.json';
import styled from 'styled-components';
import axios from 'axios';
import { SearchParam } from '../class/SearchParam';
import { filter } from 'lodash';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 100%;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin-top: 40px;
  ul {
    margin: 0;
  }
`;

const VideosList = styled.div`
  max-width: 720px;
  margin: auto;
  list-style: none;
  li {
    margin-top: 10px;
  }
`;

const TableBorder = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  border-spacing: 0;
  th,
  td {
    border: solid 1px;
  }
`;

export const Score = () => {
  const [memberScores, setMemberScores] = useState<MemberScore[]>([]);
  const initParam = new SearchParam(undefined, [], undefined, undefined, undefined);
  const [searchParam, setSearchParam] = useState<SearchParam>(initParam);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  useEffect(() => {
    getMember();
  }, []);

  const getMember = async () => {
    try {
      const { data, status } = await axios.get('/api/score' + searchParam.makeQuery());
      console.log(status);
      setMemberScores(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setMemberScores([]);
    }
  };

  //  e:ChangeEvent<HTMLInputElement>とe: ChangeEvent<HTMLSelectElement>で共通につかえるものはないのでanyで代用
  const handleChange = (e: any, field: keyof SearchParam) => {
    const newSearchParam = _.cloneDeep(searchParam);

    let value;
    if (field === 'maxPoint' || field === 'minPoint') {
      value = e.currentTarget.value.trim() === '' ? undefined : parseInt(e.currentTarget.value);
      newSearchParam[field] = value;
    } else if (field === 'style') {
      const existingStyles = newSearchParam.style || [];
      const selectedStyle = e.currentTarget.value;

      if (existingStyles.includes(selectedStyle)) {
        // すでに選択されている場合、選択を解除する
        newSearchParam.style = existingStyles.filter((style) => style !== selectedStyle);
      } else {
        // 選択されていない場合、選択を追加する
        newSearchParam.style = [...existingStyles, selectedStyle];
      }
    } else {
      value = e.currentTarget.value;
      newSearchParam[field] = value;
    }
    setSearchParam(newSearchParam);
  };

  const debugParam = () => {
    console.log(searchParam);
    console.log(searchParam.makeQuery());
    getMember();
  };

  return (
    <>
      <Wrapper>
        <SearchArea>
          <button onClick={debugParam}>デバッグ</button>
          <div>
            <div>地域</div>
            <select value={searchParam?.area} onChange={(e) => handleChange(e, 'area')}>
              <option value=""></option>
              {score.pref.map((pref) => (
                <option value={pref.code}>{pref.name}</option>
              ))}
            </select>
          </div>
          <div>
            <div>形態</div>
            <ul>
              {score.style.map((style, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={style.code}
                    id={`style-${style.code}`}
                    checked={searchParam.style?.includes(style.code)}
                    onChange={(e) => handleChange(e, 'style')}
                  />
                  <label htmlFor={`style-${style.code}`}>{style.name}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>ポイント</div>
            <input
              type="number"
              value={searchParam?.minPoint}
              onChange={(e) => handleChange(e, 'minPoint')}
            />{' '}
            〜{' '}
            <input
              type="number"
              value={searchParam?.maxPoint}
              onChange={(e) => handleChange(e, 'maxPoint')}
            />
          </div>
          <div>
            <div>月</div>
            <div>
              <select value={searchParam?.month} onChange={(e) => handleChange(e, 'month')}>
                <option value=""></option>
                {months.map((month) => (
                  <option value={month}>{month}月</option>
                ))}
              </select>
            </div>
          </div>
        </SearchArea>
        <TableBorder>
          <thead>
            <tr>
              <td>名前</td>
              <td>地域</td>
              <td>形態</td>
              <td>Point</td>
            </tr>
          </thead>
          <tbody>
            {memberScores.map((memberScore: MemberScore) => (
              <tr key={memberScore._id}>
                <td>{memberScore.name}</td>
                <td>{memberScore.area}</td>
                <td>{memberScore.style}</td>
                <td>{memberScore.point}</td>
              </tr>
            ))}
          </tbody>
        </TableBorder>
      </Wrapper>
    </>
  );
};
