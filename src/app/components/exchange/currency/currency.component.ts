import { Component, OnInit } from '@angular/core';
import { Icurrency } from 'src/app/interfaces/Icurrency';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit{

  currencyEuro: Icurrency | undefined;
  currencyReal: Icurrency | undefined;
  currencyPChi: Icurrency | undefined;
  currencyPUru: Icurrency | undefined;

  constructor (private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.showEuro();
    this.showReal();
    this.showPChile();
    this.showPUruguay();
  }

  showEuro() {
    this.currencyService.getEuro()
      .subscribe(data => { 
        this.currencyEuro = data
      })
  }
  showReal() {
    this.currencyService.getReal()
      .subscribe(data => { 
        this.currencyReal = data
      })
  }
  showPChile() {
    this.currencyService.getPChile()
      .subscribe(data => { 
        this.currencyPChi = data
      })
  }
  showPUruguay() {
    this.currencyService.getPUruguay()
      .subscribe(data => { 
        this.currencyPUru = data
      })
  }
  formatDateHour(dateHour: string) {
    let fechaHora = new Date('2023-11-19T11:50:00.000Z');
    let fecha = fechaHora.toLocaleDateString();
    let hora = fechaHora.toLocaleTimeString();
    let resp = hora + ' - ' + fecha;
    return resp; 
  }



}
