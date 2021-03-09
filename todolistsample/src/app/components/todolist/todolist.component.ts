import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/task';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit, OnDestroy {

  public tasks: Task[] = [];
  public doneTasks: Task[] = [];
  public editMode = false;
  private taskName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  public taskForm: FormGroup = new FormGroup({
    taskName: this.taskName
  });
  private deleteAllDoneSubscription: Subscription = null;

  constructor(private taskService: TasksService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.filter(task => !task.done);
      this.doneTasks = tasks.filter(task => task.done);
    }, () => {
      this.toastrService.error('Unable to get tasks');
    });
    this.deleteAllDoneSubscription = this.taskService.deleteAllDone.subscribe(() => {
      const deleteTaskActions: Observable<void>[] = this.doneTasks
        .map((task: Task, index: number, all: Task[]) => this.taskService.deleteTask(task).pipe(delay(500 * index)));
      forkJoin(deleteTaskActions).subscribe(() => {
        this.toastrService.success('All done tasks correctly deleted');
        this.doneTasks = [];
      }, () => {
        this.toastrService.error('An error occured when trying to delete all done tasks');
      });
    });
  }

  ngOnDestroy(): void {
    if (this.deleteAllDoneSubscription) {
      this.deleteAllDoneSubscription.unsubscribe();
    }
  }

  public taskDone(task: Task, done: boolean): void {
    if (done) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      this.doneTasks.push(task);
    } else {
      this.doneTasks.splice(this.doneTasks.indexOf(task), 1);
      this.tasks.push(task);
    }
    task.done = done;
    this.taskService.updateTask(task).subscribe(() => this.toastrService.success('Task correctly updated'),
      () => this.toastrService.error('An error occured when trying to update task'));
  }

  public createTask(): void {
    if (this.taskName.valid) {
      const task: Task = {
        content: this.taskName.value,
        done: false
      };
      this.taskService.addTask(task).subscribe(() => {
        this.toastrService.success('Task correctly created');
        this.editMode = false;
        this.taskName.setValue('');
        this.tasks.push(task);
      }, () => this.toastrService.error('An error occured when trying to save task'));
    } else {
      if (this.taskName.errors.required) {
        this.toastrService.error('Task name is required');
      } else if (this.taskName.errors.minLength) {
        this.toastrService.error('Invalid task name : ' + this.taskName.errors.minLength);
      }
    }
  }

  public deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.toastrService.success('Task correctly deleted');
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },
      () => this.toastrService.error('An error occured when trying to delete a task'));
  }

}
