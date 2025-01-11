import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Basic } from './pages/Basic';
import { Update as MarkdownUpdate } from './pages/Markdown/Update';
import { Index as MarkdownIndex } from './pages/Markdown/Index';
import { MultiPulldown } from './pages/MultiPulldown';
import { Price } from './pages/Price';
import { Todo } from './pages/Todo';
import { createGlobalStyle } from 'styled-components';
import { useStateWithStorage } from './hooks/useStateWithStorage';
import { TopPage } from './pages/Youtube/TopPage';
import { PlayerPage } from './pages/Youtube/PlayerPage';
import { NotFoundPage } from './pages/Youtube/NotFoundPage';
import { Score } from './pages/Score';
import { Context } from './pages/Context';

// 全体に適用
const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`;

const App = () => {
  const StorageKey = 'pages:markdown';
  const [inputValue, setValue] = useStateWithStorage('', StorageKey);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/basic" element={<Basic />} />
          <Route path="/multipulldown" element={<MultiPulldown />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/price" element={<Price />} />
          <Route path="/editor" element={<MarkdownUpdate defaultText={inputValue} />} />
          {/** setValueを移管できるのだがうまく遷移できない・・・ **/}
          <Route path="/history" element={<MarkdownIndex setValue={() => setValue} />} />
          <Route path="/youtube/" Component={TopPage} />
          <Route path="/youtube/:videId" Component={PlayerPage} />
          <Route path="/score" Component={Score} />
          <Route path="/context" Component={Context} />
          <Route path="/form" Component={Context} />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
