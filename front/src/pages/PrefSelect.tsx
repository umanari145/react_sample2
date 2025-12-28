import { FC, useEffect, useState } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import axios from 'axios';
import { Pref } from '../class/Pref';
import { City } from '../class/City';
import { Town } from '../class/Town';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 100%;
`;

interface ModalParams {
  isOpen: boolean;
  setClose: () => void;
  prefName: string;
  prefCode: string;
}

const FormModal: FC<ModalParams> = ({ isOpen, setClose, prefName, prefCode }) => {
  const [mode, setMode] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [selectedCityCode, setSelectedCityCode] = useState<string>('');
  const [selectedCityName, setSelectedCityName] = useState<string>('');
  const [selectedZipCode, setSelectedZipCode] = useState<string>('');
  const [selectedTownName, setSelectedTownName] = useState<string>('');


  useEffect(() => {
    fetchCities();
  }, [isOpen, prefCode]);

  const fetchCities = async () => {
    setCities([]);
    if (!prefCode) {
      setCities([]);
      return;
    }
    setMode('city');
    try {
      const { data, status } = await axios.get(
        `http://57.182.154.123/api/prefs/${prefCode}/cities`
      );
      if (status === 200 && data.success) {
        setCities(data.data);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setCities([]);
    }
  };

  if (!isOpen) {
    return null;
  }

  /**
   * TODO closeタイミングが時間のモーダル更新時のため、あたいが画面に残ってしまう
   */
  const handleClose = () => {
    setMode('city');
    setCities([]);
    setTowns([]);
    setSelectedCityCode('');
    setSelectedCityName('');
    setSelectedZipCode('');
    setSelectedTownName('');
    setClose();
  };

  const handleRegister = () => {
    if (!selectedCityCode) {
      alert('市区町村を選択してください');
      return;
    }
    console.log('市区町村コードを表示しています');
    console.log(selectedCityCode);
  };
  // モーダルの外（オーバーレイ部分）をクリックした場合の挙動は、handleCloseを呼び出すことで「モーダルを閉じる」という反応にしています。
  // 具体的には、return文の中にある<div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />がそれに該当します。
  //
  // もし「モーダルの外をクリックした時にモーダルを閉じたくない」場合は、このdivのonClickを外せばOKです。
  //
  // 他にも、外クリック時に確認ダイアログを出す・値をリセットする等の追加処理をしたい場合は、handleClose関数内にお好みの処理を追加してください。

  const handleCitySelect = async (cityName: string, cityCode: string) => {
    setSelectedCityCode(cityCode);
    setMode('town');
    setTowns([]);
    setSelectedZipCode('');
    setSelectedCityName(cityName);

    try {
      const { data, status } = await axios.get(
        `http://57.182.154.123/api/cities/${cityCode}/towns`
      );
      if (status === 200 && data.success) {
        setTowns(data.data);
      } else {
        setTowns([]);
      }
    } catch (error) {
      console.error('Error fetching aza data: ', error);
      setTowns([]);
    }
  };

  const setModeCity = () => {
    setMode('city');
    setTowns([]);
    setSelectedCityName('');
    setSelectedZipCode('');
    setSelectedTownName('');
  };

  const handleTownSelect = (townName: string, zipCode: string) => {
    setSelectedTownName(townName);
    setSelectedZipCode(zipCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl x-4 z-10 w-1/2">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{selectedZipCode} {prefName} {selectedCityName} {selectedTownName}</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={handleClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {mode === 'city' && (
        <div className="p-2 h-64 overflow-auto">
          <div className="mt-3 mb-8">
            <ul className="flex gap-3 flex-wrap flex-start">
              {cities.map((city) => (
                <li key={`li-city-${city.city_code}`}>
                  <input
                    className="peer hidden"
                    type="radio"
                    name="city_select"
                    checked={selectedCityCode === city.city_code}
                    onChange={() => setSelectedCityCode(city.city_code)}
                    value={city.city_code}
                    id={`city-${city.city_code}`}
                  />
                  <label
                    htmlFor={`city-${city.city_code}`}
                    className="inline-block min-w-32 px-2 py-2 text-center bg-white border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-green-400 peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500 peer-checked:scale-105 font-medium"
                    onClick={() => handleCitySelect(city.city_name, city.city_code)}
                  >
                    {city.city_name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}

        {/* town選択 */}
        {mode === 'town' && (
        <div className="p-2 h-64 overflow-auto">
          <div className="mt-3 mb-8">
            <ul className="flex gap-3 flex-wrap flex-start">
              {towns.map((town:Town) => (
                <li key={`li-town-${town.zip_code}`}>
                  <input
                    className="peer hidden"
                    type="radio"
                    name="town_select"
                    checked={selectedZipCode === town.zip_code}
                    onChange={() => setSelectedZipCode(town.zip_code)}
                    value={town.zip_code}
                    id={`town-${town.zip_code}`}
                  />
                  <label
                    htmlFor={`town-${town.zip_code}`}
                    className="inline-block min-w-32 px-2 py-2 text-center bg-white border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-green-400 peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500 peer-checked:scale-105 font-medium"
                    onClick={() => handleTownSelect(town.town_name, town.zip_code)}
                  >
                    {town.town_name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}

        <div className="flex py-4 justify-center border-t">
          <button
            className="mr-4 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            onClick={handleClose}
          >
            キャンセル
          </button>
          {mode === 'town' && (
            <button
              className="mr-4 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              onClick={() => setModeCity()}
            >
              戻る
            </button>
          )}
          <button 
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={handleRegister}
          >登録
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrefSelect: FC = () => {
  const [prefs, setPrefs] = useState<Pref[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [prefName, setPrefName] = useState('');
  const [prefCode, setPrefCode] = useState('');

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const { data, status } = await axios.get(
          'http://57.182.154.123/api/prefs'
        );
        if (status === 200 && data.success) {
          setPrefs(data.data);
        } else {
          setPrefs([]);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setPrefs([]);
      }
    };
    fetchPrefs();
  }, []);

  const handleClose = () => setIsOpen(false);

  const handlePrefSelect = (pref_name: string, pref_code: string) => {
    setIsOpen(true);
    setPrefName(pref_name);
    setPrefCode(pref_code);
  };

  return (
    <Wrapper>
      <div className="mt-4 mb-8">
        <ul className="flex gap-3 flex-wrap">
          {prefs.map((pref) => (
            <li key={`li-pref-${pref.pref_code}`}>
              <input
                className="peer hidden"
                type="radio"
                name="pref_select"
                value={pref.pref_code}
                id={`pref-${pref.pref_code}`}
              />
              <label
                htmlFor={`pref-${pref.pref_code}`}
                className="inline-block w-24 px-2 py-2 text-center bg-white border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-green-400 peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500 peer-checked:scale-105 font-medium"
                onClick={() => handlePrefSelect(pref.pref_name, pref.pref_code)}
              >
                {pref.pref_name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* モーダル */}
      <FormModal
        isOpen={isOpen}
        setClose={handleClose}
        prefName={prefName}
        prefCode={prefCode}
      />
    </Wrapper>
  );
};
