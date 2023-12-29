import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Basic } from './pages/Basic';
import { Markdown } from './pages/Markdown';
import { MultiPulldown } from './pages/MultiPulldown';
import { Price } from './pages/Price';
import { Todo } from './pages/Todo';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic" element={<Basic />} />
        <Route path="multipulldown" element={<MultiPulldown />} />
        <Route path="todo" element={<Todo />} />
        <Route path="price" element={<Price />} />
        <Route path="markdown" element={<Markdown />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
