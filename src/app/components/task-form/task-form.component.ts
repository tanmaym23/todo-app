import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import * as TaskActions from '../../store/actions/todo.actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'low',
    status: 'to-do'
  };

  constructor(private store: Store) {}

  onSubmit() {
    if (this.task.title.trim()) {
      this.task.id = uuidv4();
      this.store.dispatch(TaskActions.addTask({ task: this.task }));
      this.resetForm();
    }
  }

  resetForm() {
    this.task = {
      id: '',
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'low',
      status: 'to-do'
    };
  }
}
