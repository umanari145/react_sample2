import { FC, useEffect, useState } from 'react';
import { setTextRange } from 'typescript';
import { MemoRecord } from '../../class/MemoRecord';
import { getMemos } from '../../indexeddb/Memo';

import { Header, Wrapper, H1 } from '../../libs/MarkdonwStyle';

type Props = {
  setValue: (text: string) => void;
};

export const Index: FC<Props> = ({ setValue }) => {
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  // こうかいてしまうと永久にループが走ってしまう
  /*getMemos().then((memos: MemoRecord[]) => {
    console.log('aaaa');
    setMemos(memos);
  });*/

  // コンポーネントマウント時(Vueのmounted)とwatch的な使い方を行う
  useEffect(() => {
    console.log('aaaa');
    getMemos().then(setMemos);
  }, []);

  return (
    <>
      <Header>
        <H1>マークダウン一覧</H1>
      </Header>
      <Wrapper>
        <ul>
          {memos.map((memo: MemoRecord, index: number) => (
            <li
              key={index}
              onClick={() => {
                alert(memo.title);
                alert(memo.text);
                setValue(memo.text);
                location.href = '/editor';
              }}
            >
              {memo.title}
            </li>
          ))}
        </ul>
      </Wrapper>
    </>
  );
};
