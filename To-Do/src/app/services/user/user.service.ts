import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/interfaces/Iuser';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = 'http://localhost:4000/users'
  private logUser?: Iuser;


  constructor(private router: Router,
              private http: HttpClient
              ) { }

    get currentUser(): Iuser | undefined {
    if (!this.logUser) return undefined
    return { ...this.logUser };
  }

  getUsers(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(this.url)
  }
  

  logInCheck(user: string, pass: string){
    this.getUsers().subscribe(users => {
      users.find(u => {
        if (u.pass === pass && u.user === user) {
          this.logUser = u;
          localStorage.setItem('token', u.id.toString())
          this.router.navigate(['/userHome']) 
        }/*else{
          alert('Usuario o Contraseña Incorrectos')
          this.router.navigate(['home'])
        }*/
      });
    });
  }

  
  checkStatusAutenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      return of(false)
    }
    return this.http.get<Iuser>(`${this.url}/${token}`)
      .pipe(
        tap(u => this.logUser = u),
        map(u => !!u),
        catchError(err => of(false))
      )
  }

  async postUser(user: Iuser){
    try{
      await fetch(this.url,
        {
          method:'POST',
          body: JSON.stringify(user),
          headers: {'Content-type': 'application/json'}
        }
      )
      this.router.navigate(['home'])
    }catch (error){
      console.log(error);
    }
  }

  logout() {
    this.logUser = undefined;
    localStorage.clear()
  }


  //*-----------------ADMIN/MODIF-SI-CABE--------------------------------*//
  async deleteUser(id: number){
    try{
      await fetch(`${this.url}/${id}`, { method:'DELETE'})
      window.location.href='index.html'
    }catch (error){
      console.log(error);
    }
  }

  async getUser(id:number){
    try{
      const resultado = await fetch(`${this.url}/${id}`)
      const user = resultado.json()
      return user;
    }catch (error){
      console.log(error);
    }
  }

  async putUser(user: Iuser){
    try{
      await fetch(`${this.url}/${user.id}`,
                {
                  method:'PUT',
                  body: JSON.stringify(user),
                  headers: {'Content-type': 'application/json'}
                }
      )
      this.router.navigate(['home'])
    }catch (error){
      console.log(error);
    }
  }

  
}
