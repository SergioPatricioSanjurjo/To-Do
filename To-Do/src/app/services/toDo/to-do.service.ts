import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItoDo } from 'src/app/interfaces/ItoDo';
import { enviroments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  url:string = enviroments.baseUrl

  constructor(private router: Router,
              private http: HttpClient
              ) { }


  getToDos(): Observable<ItoDo[]> {
    return this.http.get<ItoDo[]>(`${this.url}/toDos`)
  }

  getToDo(id: number): Observable<ItoDo> {
    return this.http.get<ItoDo>(`${this.url}/toDos/${id}`)
  }  

  deleteToDo(id: number): Observable<ItoDo> {
    return this.http.delete<ItoDo>(`${this.url}/toDos/${id}`)
  }

  postToDo(toDo: ItoDo): Observable<ItoDo> {
    let headers = { 'content-type': 'application/json'}  
    let body = JSON.stringify(toDo);
    return this.http.post<ItoDo>(`${this.url}/toDos`, body, {'headers': headers})
  }

  putTodo(toDo: ItoDo): Observable<ItoDo> {
    let headers = {'content-type': 'application/json'}  
    let body = JSON.stringify(toDo);
    return this.http.put<ItoDo>(`${this.url}/toDos/${toDo.id}`, body, {'headers': headers})
  }




}
