import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly url: string = 'http://localhost:3000/tasks';
  private deleteAllDoneSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public deleteAllDone: Observable<boolean> = this.deleteAllDoneSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  public addTask(task: Task): Observable<Task> {
    return new Observable(observer => {
      this.http.post<Task>(this.url, task, { observe: 'response' }).subscribe((response) => {
        if (response.headers.has('Location')) {
          let location: string = response.headers.get('Location');
          location = location.substring(this.url.length + 1);
          task.id = location;
        }
        observer.next(task);
        observer.complete();
      }, () => observer.error());
    });
  }

  public updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${task.id}`, task);
  }

  public deleteTask(task: Task): Observable<void> {
    const taskUrl: string = [this.url, task.id].join('/');
    return this.http.delete<void>(taskUrl);
  }

  public removeAllDone(): void {
    this.deleteAllDoneSubject.next(true);
  }

}
