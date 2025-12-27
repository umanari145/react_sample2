import { ChangeEvent, FC, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { MemberScore } from '../class/MemberScore';
import score from '../json/score.json';
import styled from 'styled-components';
import axios from 'axios';
import { SearchParam } from '../class/SearchParam';
import { filter } from 'lodash';
import { Pref } from '../class/Pref';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 100%;
`;

export const Modal = () => {
  const [prefs, setPrefs] = useState<Pref[]>([]);
  const initParam = new SearchParam(undefined, [], undefined, undefined, undefined);
  const [searchParam, setSearchParam] = useState<SearchParam>(initParam);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  useEffect(() => {
    getPrefs();
  }, []);

  const getPrefs = async () => {
    try {
      const {data, status} = await axios.get('http://57.182.154.123/api/prefs');
      if (status === 200 && data.success === true) {
        setPrefs(data.data);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setPrefs([]);
    }
  };

  const selectCity = (pref_code:string) => {
    console.log(pref_code);
  };

  return (
    <>
      <Wrapper>

        <div className="mb-8">
          <ul className="flex gap-3 flex-wrap">      
          {prefs.map((pref: Pref) => (
            <li>
              <input 
                className="peer hidden" 
                type="radio" 
                name="pref_select"
                value={pref.pref_code}
                id={`pref-${pref.pref_code}`}
              />
              <label 
                htmlFor ={`pref-${pref.pref_code}`}
                className="inline-block w-24 px-2 py-2 text-center bg-white border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-green-400 peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500 peer-checked:scale-105 font-medium"
                onClick={()=>selectCity(pref.pref_code)}
              >
                {pref.pref_name}
              </label>
            </li>
          ))}
          </ul>
        </div>
      </Wrapper>
    </>
  );
};
