import { ChangeEvent, FC } from "react";

type Props = {
  taskName:string,
  addTask:()=>void,
  handleChange: (e:ChangeEvent<HTMLInputElement>) => void
}  

export const InputTodo:FC<Props> = ({
    taskName,
    addTask,
    handleChange
}) => {
  return (
    <>
      <input 
        type="text" 
        value={taskName} 
        onChange={handleChange}
      />
      <button onClick={addTask}>追加</button>
    </>
  )    
}