import { FC } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;
`;

type Props = {
  children: string;
  onClick: () => void;
  cancel?: boolean;
};

export const MarkdownSaveButton: FC<Props> = ({ children, onClick, cancel }) => {
  return (
    <Button onClick={onClick} className={cancel ? 'cancel' : ''}>
      {children}
    </Button>
  );
};
