import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItoDo } from 'src/app/interfaces/ItoDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private url:string = 'http://localhost:4000/toDos'

  constructor(private router: Router,
              private http: HttpClient
              ) { }


  getToDos(): Observable<ItoDo[]> {
    return this.http.get<ItoDo[]>(this.url)
  }

  getToDo(id: number): Observable<ItoDo> {
    return this.http.get<ItoDo>(`${this.url}/${id}`)
  }  

  deleteToDo(id: number): Observable<ItoDo> {
    return this.http.delete<ItoDo>(`${this.url}/${id}`)
  }

  postToDo(toDo: ItoDo): Observable<ItoDo> {
    let headers = { 'content-type': 'application/json'}  
    let body = JSON.stringify(toDo);
    return this.http.post<ItoDo>(this.url, body, {'headers': headers})
  }

  /*putTodo(toDo: ItoDo): Observable<ItoDo> {
    let headers = {'content-type': 'application/json'}  
    let body = JSON.stringify(toDo);
    return this.http.put<ItoDo>(this.url, body, {'headers': headers})
  }*/

  putTodo(task: ItoDo): Observable<ItoDo>{
    return this.http.put<ItoDo>(`${this.url}/${task.id}`, task, {headers: {'Content-type': 'application/json'}})
  }




}
