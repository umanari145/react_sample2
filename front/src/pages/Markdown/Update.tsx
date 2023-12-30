import { FC, useState } from 'react';
import { useStateWithStorage } from '../../hooks/useStateWithStorage';
import { putMemo } from '../../indexeddb/Memo';

import { Header, Wrapper, TextArea, Preview, H1 } from '../../libs/MarkdonwStyle';
import { SaveModal } from '../../libs/SaveModal';

type Props = {
  defaultText: string;
};

export const Update: FC<Props> = ({ defaultText }) => {
  const StorageKey = 'pages:markdown';
  const [inputValue, handleChange] = useStateWithStorage(defaultText, StorageKey);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const irregular_style = {
    color: 'blue',
    backgroundColor: 'lightgray',
    padding: '10px',
    border: '1px solid black',
  };

  return (
    <>
      <Header>
        <H1>マークダウン</H1>
        {isShowModal && (
          <SaveModal
            onSave={(title: string) => {
              putMemo(title, inputValue);
              setIsShowModal(false);
            }}
            onCancel={() => setIsShowModal(false)}
          ></SaveModal>
        )}
        <button
          style={irregular_style}
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          保存する
        </button>
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
