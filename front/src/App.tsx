import React, {useState} from 'react';
import './App.css';

function App() {

  const players: Array<string> = ['kiyohara', 'ochiai']

  const [inputValue, setInputValue] = useState<string>('defaultValue')

  const addTask = () => {
    console.log(inputValue)
    alert({inputValue})
  };

  return (
    <div className="App">
      <header className="App-header">
        タスク管理ツールだよ
      </header>

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
    </div>
  );
}

export default App;
