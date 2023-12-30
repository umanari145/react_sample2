export const TaskStatusMap = {
  UNCOMPLETE: '1',
  COMPLETE: '2',
};

export type TaskStatus = (typeof TaskStatusMap)[keyof typeof TaskStatusMap];

export class Task {
  private _id: string;
  private _name: string;
  private _state: TaskStatus;

  constructor(id: string, name: string, state?: TaskStatus) {
    this._id = id;
    this._name = name;
    this._state = state ?? TaskStatusMap.UNCOMPLETE;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get status(): TaskStatus {
    return this._state;
  }
}
