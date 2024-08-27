import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { SortOrder } from '../../models/sort-order.model';

export const loadTasks = createAction('[Task] Load Tasks');
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const sortTasks = createAction('[Task] Sort Tasks', props<{ field: string, order: SortOrder }>());