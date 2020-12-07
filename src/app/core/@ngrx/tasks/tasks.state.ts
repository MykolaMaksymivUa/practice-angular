import { Task } from './../../../tasks/models/task.model';

export interface TasksState {
  data: ReadonlyArray<Task>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialTasksState: TasksState = {
  data: [
  ],
  loaded: false,
  loading: false,
  error: null,
};
