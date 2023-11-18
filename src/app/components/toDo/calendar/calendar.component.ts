import { HttpClient } from '@angular/common/http';
import { ToDoService } from 'src/app/services/toDo/to-do.service';
import { Component, OnInit } from '@angular/core';
import { ItoDo } from 'src/app/interfaces/ItoDo';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  constructor(private toDoService: ToDoService, private http: HttpClient, private userService: UserService, private router: Router) { }

  taskList: ItoDo[] | undefined = [];

  eventsList: any[] | undefined = [];

  cargarEvents(){
    this.toDoService.getToDos().pipe(
      map((td:ItoDo[]) => td.filter(td => td.user === this.userService.currentUser?.user)) // recibe todos los tasks y los filtra segun el usuario logeado
    ).subscribe({
      next: (td) =>{
        this.taskList = td; // aca se cargan los tasks filtrados
        localStorage.setItem('taskList', JSON.stringify(this.taskList)); //guardo la tasklist
        this.desestructurar() // tengo que llamar esta funcion aca porque sino se cargan los eventos del localStorage anterior
      },error: (err) =>{
        console.log(err);
      }
    })
  }

  /*saveTaskListToLocal() {
    // Convert taskList to a JSON string and store it in localStorage
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
  }
  
  // Call this method when you want to retrieve the taskList from localStorage
  loadTaskListFromLocal() {
    const storedTaskList = localStorage.getItem('taskList');
    if (storedTaskList) {
      this.taskList = JSON.parse(storedTaskList);
    }
    return this.taskList
  }*/

  desestructurar() {
    const storedTaskList = localStorage.getItem('taskList'); //traigo la taskList guardada
    if (storedTaskList) {
      this.taskList = JSON.parse(storedTaskList); 
    }
    this.taskList?.forEach((toDo: ItoDo) => {   //recorro el arreglo de tasks del usuario
      const { task, date } = toDo;   //desestructura el arreglo de tasks, me quedo con el titulo y la fecha
    
      const eventoFullCalendar = {  // cargo una variable de tipo evento
        title: task,
        date: date
      };

      this.eventsList?.push(eventoFullCalendar) //agrego los eventos a la lista de eventos
    })

    this.calendarOptions = {
      events: this.eventsList  //asigno el arreglo de los eventos de usuario a los eventos del calendario
    }
  }

  calendarOptions: CalendarOptions | any  //este es el calendario

  ngOnInit(): void {
    console.log(this.userService.currentUser?.user);
    this.cargarEvents()
    this.calendarOptions = { // cargo el calendar aca porque si no da un error de la API
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth'
    }
  }

}
