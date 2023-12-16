import React, {useState} from 'react';
import './App.css';
import { Button } from './libs/Button';
import { Heading } from './libs/Heading';
import { Password } from './libs/Password';
import {Text} from './libs/Text';
import { TextArea } from './libs/TextArea';

const App = () => {

  const players: Array<string> = ['kiyohara', 'ochiai']

  // 以下のような関数を通さないと再レンダリングされない
  // [入力用, セット用の関数] = 引数 
  const [inputValue, setInputValue] = useState<string>('何も入れないとこの値が表示される')

  const addTask = () => {
    console.log(inputValue)
    alert(inputValue)
  };

  return (
    <div className="App">
      <Heading tag="h1">見出し</Heading>
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
        onClick={()=>{ alert('normal')}}
        type="primary"
        width={200} 
      />
      <Button 
        title="secondButton" 
        onClick={()=>{ alert('secondry')}}
        type="secondary"
        width={300} 
      />
      <Button 
        title="error" 
        onClick={()=>{ alert('error')}}
        type="error"
        width={500} 
      />
      </p>
      
      <ul>
        {/* Reactはforeach使わずmapでループを展開する*/}
        {players.map((player: string, index: number) => (
          <li>{index+1}:{player}</li>
        ))}
      </ul>

      <input
          type="text"
          value={inputValue}
          onChange={(event) => {setInputValue(event.target.value)}}
          placeholder="Add a new task"
      />

      <button onClick={addTask}>追加</button>
      <div>{inputValue}</div>
    </div>
  );
}

export default App;
