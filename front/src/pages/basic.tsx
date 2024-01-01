import React, { useEffect, useState } from 'react';
import '../App.css';
import { Button } from '../libs/Button';
import { ColorfulMessage } from '../libs/constants/ColorfulMessage';
import { Heading } from '../libs/Heading';
import { Password } from '../libs/Password';
import { Text } from '../libs/Text';
import { TextArea } from '../libs/TextArea';

export const Basic = () => {
  const players: Array<string> = ['kiyohara', 'ochiai'];

  {
    /* 再レンダリングされる場合 stateの更新とpropsの値が変わった時。また
  親が再レンダリングされると子供も再レンダリングされる
  */
  }

  // 以下のような関数を通さないと再レンダリングされない
  // [入力用, セット関数・・単純なsetter] = userState<型>初期値
  const [inputValue, setInputValue] = useState<string>('何も入れないとこの値が表示される');
  const [num, setNum] = useState<number>(0);
  const [isShow, setIsShow] = useState<boolean>(false);

  const addTask = () => {
    console.log(inputValue);
    alert(inputValue);
  };

  const countUp = () => {
    setNum(num + 1);
  };

  const onClickToggle = () => {
    setIsShow(!isShow);
  };

  /*Too many re-rendersはstateの更新から再レンダリングされる**
      isShow がないとsetIsShowで再評価されて再レンダリングしてsetIsShowされる・・・
  という影響ループになってしまう
      */

  // 第二引数に変更があったときにuseEffectが動く
  // 処理の関心を切り分けられる
  useEffect(() => {
    console.log('--useEffect--');
    if (num % 3 === 0) {
      isShow || setIsShow(true);
    } else {
      isShow && setIsShow(false);
    }
  }, [num]);

  return (
    <div>
      <Heading tag="h1">見出し</Heading>
      <h2 style={{ color: 'red' }}>cssをあてる</h2>
      <ColorfulMessage color="gray" message="PHP" />
      <ColorfulMessage color="red" message="JavaScript" />
      <ColorfulMessage color="green" message="Java" />
      {/** 以下のようにタグの中で挟むチルドレンという書き方もある Heading参照**/}
      {/** <ColorfulMessage color="green">Java</ColorfulMessage>**/}

      <button onClick={countUp}>カウントアップ</button>
      <p>{num}</p>

      <button onClick={onClickToggle}>on/off</button>
      {isShow && <p>ほげほげ</p>}

      <Heading tag="h4">
        <span>Hello,word</span>
      </Heading>
      <Text text="Vゴウキ、Vナッシュ" />

      <Password />
      <p>
        <TextArea width={500} maxLength={300} />
      </p>

      <p>
        <Button
          title="normalButton"
          onClick={() => {
            alert('normal');
          }}
          type="primary"
          width={200}
        />
        <Button
          title="secondButton"
          onClick={() => {
            alert('secondry');
          }}
          type="secondary"
          width={300}
        />
        <Button
          title="error"
          onClick={() => {
            alert('error');
          }}
          type="error"
          width={500}
        />
      </p>

      <ul>
        {/* Reactはforeach使わずmapでループを展開する*/}
        {players.map((player: string, index: number) => (
          <li>
            {index + 1}:{player}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="Add a new task"
      />

      <button onClick={addTask}>追加</button>
      <div>{inputValue}</div>

      {/* {}内ではJavaScriptを動かせるということ */}
      <button
        onClick={() => {
          alert('本日は晴天なり');
        }}
      >
        追加
      </button>
    </div>
  );
};
