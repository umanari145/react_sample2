import { FC } from "react";
import { Task } from "../../class/Task";

type Props = {
    uncompleteTasks:Task[],
  deleteTask:(deleteTaskId:string) => void,
  completeTask: (completeTaskId:string) => void
}  

export const IncompleteTask:FC<Props> = ({
    uncompleteTasks,
    deleteTask,
    completeTask
}) => {
  return (
    <div>
    {uncompleteTasks.length >= 5 && (
      <p>すでに上限値に達しています。</p>  
    )}   
    <div>ここから未完了タスクです。</div>  
    {uncompleteTasks.map((uncompleteTask: Task) => (
          /** 仮装DOMの差分を検知しやすくkeyを付与しないとダメ **/
          <li key={uncompleteTask.id}>
              {uncompleteTask.name} 
              {/** 引数が必要なので()=>とする必要がある **/}
              <button onClick={()=> deleteTask(uncompleteTask.id)}>削除</button>
              <button onClick={()=> completeTask(uncompleteTask.id)}>完了</button>
          </li>
    ))}
   </div>

  )    
}