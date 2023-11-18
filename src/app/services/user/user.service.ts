import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/interfaces/Iuser';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { enviroments } from 'src/environments/environments';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = enviroments.baseUrl;
  private logUser?: Iuser;
  

  constructor(private router: Router,
              private http: HttpClient
              ) { }

    get currentUser(): Iuser | undefined {
    if (!this.logUser) return undefined
    return { ...this.logUser };
  }

  getUsers(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(`${this.url}/users`)
  }
  

  /*logInCheck(user: string, pass: string){
    this.getUsers().subscribe(users => {
      users.find(u => {
        if (u.pass === pass && u.user === user) {
          this.logUser = u;
          enviroments.currentUser = u.user;
          //localStorage.clear();
          localStorage.setItem('token', u.id.toString());
          this.router.navigate(['/userHome']) 
        }else{
          alert ('Usuario o Contraseña Incorrectos');
        }
      });
    });
  }*/

  logInCheck(user: string, pass: string) {
    this.getUsers().subscribe(
      users => {
        const foundUser = users.find(u => u.pass === pass && u.user === user);
  
        if (foundUser) {
          this.logUser = foundUser;
          enviroments.currentUser = foundUser.user;
          localStorage.setItem('token', foundUser.id.toString());
          this.router.navigate(['/userHome']);
        } else {
          alert('Usuario o Contraseña Incorrectos');
        }
      },
      error => {
        console.log('Usuario no encontrado. Credenciales incorrectas.');
        console.error('Error al obtener usuarios:', error);
        // Manejar el error según sea necesario
      }
    );
  }

  
  checkStatusAutenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      return of(false)
    }
    return this.http.get<Iuser>(`${this.url}/users/${token}`)
      .pipe(
        tap(u => this.logUser = u),
        map(u => {
          console.log('Respuesta', !!u);
          return !!u}),
        catchError(err => of(false))
      )
  }

  async postUser(user: Iuser){
    try{
      await fetch(`${this.url}/users`,
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
    enviroments.currentUser = '';
    localStorage.clear()
  }

  private currentUserSubject = new BehaviorSubject<any>(null);

  //*-----------------ADMIN/MODIF-SI-CABE--------------------------------*//
  async deleteUser(id: number){
    try{
      await fetch(`${this.url}/users/${id}`, { method:'DELETE'})
      window.location.href='index.html'
    }catch (error){
      console.log(error);
    }
  }

  async getUser(id:number){
    try{
      const resultado = await fetch(`${this.url}/users/${id}`)
      const user = resultado.json()
      return user;
    }catch (error){
      console.log(error);
    }
  }

  async putUser(user: Iuser){
    try{
      await fetch(`${this.url}/users/${user.id}`,
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

