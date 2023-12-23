import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Basic } from './pages/Basic';
import { Todo } from './pages/Todo';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic" element={<Basic />} />
        <Route path="todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
