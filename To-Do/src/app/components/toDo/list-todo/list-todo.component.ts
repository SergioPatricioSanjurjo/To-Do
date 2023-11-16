import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ItoDo } from 'src/app/interfaces/ItoDo';
import { Iuser } from 'src/app/interfaces/Iuser';
import { ToDoService } from 'src/app/services/toDo/to-do.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit{

  constructor(private toDoService: ToDoService, private http: HttpClient, private userService: UserService) { }

  taskList: ItoDo[] | undefined = [];

  private url:string = 'http://localhost:4000/users'

  ngOnInit(): void {
    this.showTasks()
    console.log(this.getUser);
  }

  get getUser():Iuser | undefined{
    return this.userService.currentUser;
  }

  showTasks() {
    this.toDoService.getToDos().pipe(
      map((td:ItoDo[]) => td.filter(td => td.user === this.getUser?.user)) // recibe todos los tasks y los filtra segun el usuario logeado
    ).subscribe({
      next: (td) =>{
        this.taskList = td; // aca se cargan los tasks filtrados
      },
    })
  }

  deleteTask(id: number) {
    const ok = confirm(`Desea eliminar el task con el id: ${id}`)
    if(!ok) return;
    this.toDoService.deleteToDo(id).subscribe(
      {
        next: () =>{
          alert(`El task fue eliminado`)
        },
        error: (err) =>{
          console.log(err);
        }
      }
    )
  }

}
