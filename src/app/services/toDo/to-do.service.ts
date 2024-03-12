import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { ItoDo } from 'src/app/interfaces/ItoDo';
import { enviroments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  url:string = enviroments.baseUrl

  api:string = 'http://localhost:3000/tasks'

  constructor(private router: Router,
              private http: HttpClient
              ) { }


  getToDos(): Observable<ItoDo[]> {
    return this.http.get<ItoDo[]>(`${this.api}/getTasks`)
  }

  getToDo(id: any): Observable<ItoDo> {
    return this.http.get<ItoDo>(`${this.api}/getTask/${id}`)
  }  

  deleteToDo(id: any): Observable<ItoDo> {
    return this.http.delete<ItoDo>(`${this.api}/deleteTask/${id}`)
  }

  postToDo(toDo: ItoDo): Observable<ItoDo> {
    let headers = { 'content-type': 'application/json'}  
    let body = JSON.stringify(toDo);
    return this.http.post<ItoDo>(`${this.api}/postTask`, body, {'headers': headers})
  }

  putTodo(toDo: ItoDo, id: string): Observable<ItoDo> {
    let headers = {'Content-type': 'application/json'}  
    //let body = JSON.stringify(toDo);
    return this.http.patch<ItoDo>(`${this.api}/putTask/${id}`, toDo, {'headers': headers})
  }

  /*putTodo(task: ItoDo): Observable<ItoDo>{
    return this.http.put<ItoDo>(`${this.url}/${task.id}`, task, {headers: {'Content-type': 'application/json'}})
  }*/
}
