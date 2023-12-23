import { FC } from "react";
import { Task } from "../../class/Task";

type Props = {
  completeTasks:Task[],
  backTask:(backTaskId:string) => void,
}  

export const CompleteTask:FC<Props> = ({
    completeTasks,
    backTask
}) => {
  return (
    <div>
      <div>ここから完了タスクです。</div>    
      {completeTasks.map((completeTask: Task) => (
           <li key={completeTask.id}>
             {completeTask.name}   
             <button onClick={()=> backTask(completeTask.id)}>戻す</button>
           </li>
      ))}
    </div>
  )    
}