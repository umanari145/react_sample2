import { ChangeEvent, useState } from 'react';
import { Task, TaskStatusMap } from '../class/Task';
import { v4 as uuid } from 'uuid';
import { InputTodo } from './components/InputTask';
import { IncompleteTask } from './components/IncompleteTasks';
import { CompleteTask } from './components/completeTask';

export const Todo = () => {
  const [taskName, setTaskName] = useState<string>('');

  const [uncompleteTasks, setUncompleteTasks] = useState<Task[]>([]);
  const [completeTasks, setCompleteTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (taskName === '') return;
    const task: Task = new Task(uuid(), taskName, TaskStatusMap.UNCOMPLETE);
    // 下記のようにかいてもうごかないことに注意(状態変化をおこなうときにuseStateを使っていない)
    //uncompleteTasks.push(task)
    //setUncompleteTasks(uncompleteTasks)
    setUncompleteTasks([...uncompleteTasks, task]);
    setTaskName('');
  };

  const deleteTask = (deleteTaskId: string) => {
    if (!window.confirm('このタスクを削除してもよいですか？')) {
      return;
    }
    setUncompleteTasks(
      uncompleteTasks.filter((task: Task) => {
        return task.id !== deleteTaskId;
      })
    );
  };

  const completeTask = (deleteTaskId: string) => {
    const moveTask = uncompleteTasks.find((task: Task) => task.id === deleteTaskId);
    setUncompleteTasks(
      uncompleteTasks.filter((task: Task) => {
        return task.id !== deleteTaskId;
      })
    );
    setCompleteTasks([...completeTasks, moveTask!]);
  };

  const backTask = (backTaskId: string) => {
    const backTask = completeTasks.find((task: Task) => task.id === backTaskId);
    setCompleteTasks(
      completeTasks.filter((task: Task) => {
        return task.id !== backTaskId;
      })
    );
    setUncompleteTasks([...uncompleteTasks, backTask!]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value);

  return (
    <>
      <InputTodo taskName={taskName} addTask={addTask} handleChange={handleChange} />
      <IncompleteTask
        uncompleteTasks={uncompleteTasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
      <CompleteTask completeTasks={completeTasks} backTask={backTask} />
    </>
  );
};
