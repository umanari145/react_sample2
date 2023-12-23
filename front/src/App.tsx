import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Basic } from './pages/Basic';
import { MultiPulldown } from './pages/MultiPulldown';
import { Todo } from './pages/Todo';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic" element={<Basic />} />
        <Route path="multipulldown" element={<MultiPulldown />} />
        <Route path="todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
