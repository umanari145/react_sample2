import { ChangeEvent, FC, useState } from "react";
import {Header, Wrapper, TextArea, Preview, H1} from "../libs/MarkdonwStyle";

export const Markdown:FC = () => {
  const StorageKey = 'pages:markdown';
  const [inputValue, setInputValue] = useState<string>(localStorage.getItem(StorageKey) || '');

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.currentTarget.value;
    localStorage.setItem(StorageKey, textValue)
    setInputValue(textValue)
  }

  return (
    <>
     <Header>
       <H1>マークダウン</H1>
     </Header>
     <Wrapper>
       <TextArea value={inputValue} onChange={(e) => handleChange(e)}>
       </TextArea>
       <Preview><pre>{inputValue}</pre></Preview>  
     </Wrapper>
    </>
  )
}