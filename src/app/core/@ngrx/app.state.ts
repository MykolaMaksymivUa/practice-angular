import { UsersState } from './users';
import { TasksState } from './tasks';

export interface AppState {
  tasks: TasksState;
  users: UsersState,
}
