import { FC, useState } from 'react';
import styled from 'styled-components';
import { MarkdownSaveButton } from './MarkdownSaveButton';
const Wrapper = styled.div`
  align-items: center;
  background-color: #0002;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const Modal = styled.div`
  background: #fff;
  padding: 1rem;
  width: 32rem;
`;

const TitleInput = styled.input`
  width: 29rem;
  padding: 0.5rem;
`;

const Control = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`;

type Props = {
  onSave: (title: string) => void;
  onCancel: () => void;
};

export const SaveModal: FC<Props> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState<string>('');

  return (
    <Wrapper>
      <Modal>
        <p>テキストの内容を保存します。</p>
        <p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
        <p>
          <TitleInput
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </p>
        <Control>
          <MarkdownSaveButton onClick={onCancel} cancel>
            キャンセル
          </MarkdownSaveButton>
          <MarkdownSaveButton onClick={() => onSave(title)}>保存</MarkdownSaveButton>
        </Control>
      </Modal>
    </Wrapper>
  );
};
