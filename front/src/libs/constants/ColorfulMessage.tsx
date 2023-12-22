import { FC } from "react";

type Props = {
  color: string,
  message:string,
}

export const ColorfulMessage:FC<Props> = ({
  color,
  message
}) => {
    
  const contentStyle = {
    //color: color, JSのルールでオブジェクトのキーとvalueが一緒だと以下のように書ける
    color,
    fontSize: '30px'
  };
  
  return <p style={contentStyle}>{message}</p>
}