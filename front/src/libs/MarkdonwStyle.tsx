import styled from 'styled-components';

export const Header = styled.header`
  font-size: 1.5rem;
  left: 0;
  line-height: 1rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

export const H1 = styled.h1`
  color: #ff0000;
`;

export const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 5rem;
  display: flex;
`;

export const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  width: 50%;
  font-size: 1rem;
  padding: 0.5rem;
`;

export const Preview = styled.div`
  border-top: 1px solid silver;
  overflow-y: scroll;
  padding: 1rem;
  width: 50%;
`;
