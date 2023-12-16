import {FC} from "react"
import styled from "styled-components"
import { color, radius } from "./constants"

type ButtonType = 'primary' | 'secondary' | 'error'

type Props = {
  title: string,
  onClick: () => void,
  type?: ButtonType,
  width?: number
}

const Wrapper = styled.button<{width: number}>`
  margin-right: 10px;
  border-radius: ${radius.m};
  border: solid 1px ${color.black};
  background: ${color.white};
  color: ${color.black};
  width:${props => props.width}px;

&.secondary {
  border: solid 1px ${color.black};
  background: ${color.black};
  color: ${color.red};
}

&.error {
  border: none;
  background: ${color.red};
  color: ${color.white};
}
`  

export const Button:FC<Props> = ({
    title, 
    onClick,
    width = 120,
    type = 'primary'
}) => {
  return (
    <Wrapper 
      onClick={onClick}
      width={width}
      className={type}
    >
      {title}
    </Wrapper>
  )
} 