import { Component, OnInit } from '@angular/core';
import { Icurrency } from 'src/app/interfaces/Icurrency';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit{

  currencyList: Icurrency | undefined;

  constructor (private currencyService: CurrencyService) { }

  ngOnInit(): void {
    
  }


}
