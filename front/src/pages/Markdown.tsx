import { FC } from 'react';
import { useStateWithStorage } from '../hooks/useStateWithStorage';
import { Header, Wrapper, TextArea, Preview, H1 } from '../libs/MarkdonwStyle';

export const Markdown: FC = () => {
  const StorageKey = 'pages:markdown';
  const [inputValue, handleChange] = useStateWithStorage('値を入れてください', StorageKey);

  return (
    <>
      <Header>
        <H1>マークダウン</H1>
      </Header>
      <Wrapper>
        <TextArea value={inputValue} onChange={(e) => handleChange(e)}></TextArea>
        <Preview>
          <pre>{inputValue}</pre>
        </Preview>
      </Wrapper>
    </>
  );
};
