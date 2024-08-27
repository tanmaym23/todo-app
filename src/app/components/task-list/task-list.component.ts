import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../store/actions/todo.actions';
import { SortOrder } from '../../models/sort-order.model'; // Create this model for sort order

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  editingTask: Task | null = null;
  sortField: string = 'dueDate'; // Default sort field
  sortOrder: SortOrder = 'asc'; // Default sort order

  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks$ = this.store.select(state => state.tasks);
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  deleteTask(id: string) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
  }

  saveTask() {
    if (this.editingTask) {
      this.store.dispatch(TaskActions.updateTask({ task: this.editingTask }));
      this.editingTask = null;
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  exportTasksToCSV() {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const csv = tasks.map(task => `${task.title},${task.description},${task.dueDate},${task.priority},${task.status}`).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tasks.csv');
    a.click();
  }

  sortTasks(field: string) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.store.dispatch(TaskActions.sortTasks({ field: this.sortField, order: this.sortOrder }));
  }
}
