import { ChangeEvent, useState } from "react"
import { Task, TaskStatusMap } from "../class/Task"
import {v4 as uuid} from 'uuid';

export const Todo = () => {

  const [taskName, setTaskName] = useState<string>(' ')

  const [uncompleteTasks, setUncompleteTasks] = useState<Task[]>([])
  const [completeTasks, setCompleteTasks] = useState<Task[]>([])

  const addTask = () => {
    const task: Task = new Task(uuid(), taskName, TaskStatusMap.UNCOMPLETE)
    // 下記のようにかいてもうごかないことに注意(状態変化をおこなうときにuseStateを使っていない)
    //uncompleteTasks.push(task)
    //setUncompleteTasks(uncompleteTasks)
    setUncompleteTasks([...uncompleteTasks, task]); 
  }

  const deleteTask = (deleteTaskId:string) => {
    if (!window.confirm('このタスクを削除してもよいですか？')) {
        return
    }
    setUncompleteTasks(uncompleteTasks.filter((task:Task) => {
          return task.id !== deleteTaskId
      })
    )
  }
  
  const completeTask = (deleteTaskId:string) => {
    const moveTask = uncompleteTasks.find((task:Task) => task.id === deleteTaskId)
    setUncompleteTasks(uncompleteTasks.filter((task:Task) => {
          return task.id !== deleteTaskId
      })
    )
    setCompleteTasks([...completeTasks, moveTask!])
  }

  const backTask = (backTaskId:string) => {
    const backTask = completeTasks.find((task:Task) => task.id === backTaskId)
    setCompleteTasks(completeTasks.filter((task:Task) => {
          return task.id !== backTaskId
      })
    )
    setUncompleteTasks([...uncompleteTasks, backTask!])
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value)
  }

  return (
    <>
      <input type="text" value={taskName} onChange={(e)=>handleChange(e)}/>
      <button onClick={addTask}>追加</button>

      <div>
        <div>ここから未完了タスクです。</div>  
        {uncompleteTasks.map((uncompleteTask: Task) => {  
            return (
              <li key={uncompleteTask.id}>
                  {uncompleteTask.name} 
                  {/** 引数が必要なので()=>とする必要がある **/}
                  <button onClick={()=> deleteTask(uncompleteTask.id)}>削除</button>
                  <button onClick={()=> completeTask(uncompleteTask.id)}>完了</button>
              </li>
            )
          }
         )}
       </div>

       <div>
         <div>ここから完了タスクです。</div>    
           {completeTasks.map((completeTask: Task) => {  
              return (
                <li key={completeTask.id}>
                  {completeTask.name}   
                  <button onClick={()=> backTask(completeTask.id)}>戻す</button>
                </li>
              )
            }
           )}
       </div>
    </>
  )
}