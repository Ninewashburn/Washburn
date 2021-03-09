import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  public todo: any[];
  public inputData: any;  

  constructor() { 
    this.todo = [];
  }

  ngOnInit(): void {
  }

  add() {
    this.todo.push(this.inputData);
  }

  delete(index: number) {
    this.todo.splice(index,1);
  }
}
