import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TodoListSample';

  constructor(private taskService: TasksService) { }

  public removeAlldone(): void {
    this.taskService.removeAllDone();
  }
}
