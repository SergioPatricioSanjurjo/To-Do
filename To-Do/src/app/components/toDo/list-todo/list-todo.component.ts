import { Component, OnInit } from '@angular/core';
import { ItoDo } from 'src/app/interfaces/ItoDo';
import { ToDoService } from 'src/app/services/toDo/to-do.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit{

  constructor(private toDoService: ToDoService) { }

  taskList: ItoDo[] | undefined = [];

  ngOnInit(): void {
    this.showTasks()
  }

  showTasks() {}

  editTask(toDo: ItoDo) {}

  deleteTask(id: number) {}

}
