import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from '../actions/todo.actions';

export const initialState: Task[] = [];

const _taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('tasks') || '[]');
    }
    return state;
  }),
  on(TaskActions.addTask, (state, { task }) => {
    const updatedState = [...state, task];
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updatedState));
    }
    return updatedState;
  }),
  on(TaskActions.updateTask, (state, { task }) => {
    const updatedState = state.map(t => t.id === task.id ? task : t);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updatedState));
    }
    return updatedState;
  }),
  on(TaskActions.deleteTask, (state, { id }) => {
    const updatedState = state.filter(task => task.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updatedState));
    }
    return updatedState;
  }),
  on(TaskActions.sortTasks, (state, { field, order }) => {
    const sortedState = [...state].sort((a, b) => {
      if (field === 'dueDate') {
        return order === 'asc' ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      } else if (field === 'priority') {
        const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
        return order === 'asc' ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (field === 'status') {
        const statusOrder = { 'to-do': 1, 'in-progress': 2, 'completed': 3 };
        return order === 'asc' ? statusOrder[a.status] - statusOrder[b.status] : statusOrder[b.status] - statusOrder[a.status];
      }
      return 0;
    });
    return sortedState;
  })
);

export function taskReducer(state: Task[] | undefined, action: any) {
  return _taskReducer(state, action);
}
