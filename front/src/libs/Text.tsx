import { FC } from 'react';
import styled from 'styled-components';
import { fontSize } from './constants';

type Props = {
  text: string;
  className?: string;
};

/*
const {Component名} = styled.{タグ名}`
　　　{スタイル定義}
`;
 */
const Wrapper = styled.p`
  font-size: ${fontSize.m};
`;

// 以下のように戻り値をVFC<Props>きじゅつもできるが非推奨
export const Text: FC<Props> = ({ text, className = '' }) => {
  return <Wrapper className={className}>{text}</Wrapper>;
};
