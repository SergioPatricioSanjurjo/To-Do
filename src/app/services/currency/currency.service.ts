import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icurrency } from 'src/app/interfaces/Icurrency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  urlDollars:string = 'https://dolarapi.com/v1/dolares';
  urlEuro:string = 'https://dolarapi.com/v1/cotizaciones/eur';
  urlReal:string = 'https://dolarapi.com/v1/cotizaciones/brl';
  urlPChile:string = 'https://dolarapi.com/v1/cotizaciones/clp';
  urlPUruguay:string = 'https://dolarapi.com/v1/cotizaciones/uyu';

  constructor(private http: HttpClient) { }

  
  getDollars(): Observable<Icurrency[]> {
    return this.http.get<Icurrency[]>(this.urlDollars)
  }

  getEuro(): Observable<Icurrency> {
    return this.http.get<Icurrency>(this.urlEuro)
  }

  getReal(): Observable<Icurrency> {
    return this.http.get<Icurrency>(this.urlReal)
  }

  getPChile(): Observable<Icurrency> {
    return this.http.get<Icurrency>(this.urlPChile)
  }

  getPUruguay(): Observable<Icurrency> {
    return this.http.get<Icurrency>(this.urlPUruguay)
  }

}
