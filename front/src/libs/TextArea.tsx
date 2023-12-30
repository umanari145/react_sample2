import { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import { fontSize, color } from './constants';

type Props = {
  width?: number;
  maxLength: number;
  className?: string;
};

const Wrapper = styled.textarea<{ width: number }>`
  margin: 0px;
  font-size: ${fontSize.m};
  width: ${(props) => props.width}px;

  &.error {
    color: ${color.red};
  }
`;

export const TextArea: FC<Props> = ({ maxLength, width = 300 }) => {
  const [count, setCount] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCount(event.currentTarget.value.length);
  };

  const isError = (): boolean => {
    return Math.max(maxLength - count) < 0;
  };

  if (maxLength === undefined) {
    return null;
  }

  // Wrapper=textareaの親要素がないとダメらしい
  return (
    <>
      <Wrapper onChange={handleChange} width={width} className={isError() ? 'error' : ''} />
      {isError() ? '超過しています。' : `残り${Math.max(maxLength - count)}文字です。`}
    </>
  );
};
