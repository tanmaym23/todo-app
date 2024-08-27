import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { taskReducer } from './store/reducers/todo.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ tasks: taskReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
