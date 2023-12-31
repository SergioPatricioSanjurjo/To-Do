import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Icurrency } from 'src/app/interfaces/Icurrency';
import { CurrencyService } from 'src/app/services/currency/currency.service';


@Component({
  selector: 'app-dolar',
  templateUrl: './dolar.component.html',
  styleUrls: ['./dolar.component.css']
})
export class DolarComponent implements OnInit{

  dolarList: Icurrency[] | undefined;

  
 //*----------------Grafico----------------------------*//
  labels: string[] = [];
  data: number[] = [];

  chartOptions = {
    animationEnabled: true,
    theme: "dark1",  //? "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    title: {
      text: "Precio De Venta Dolar"
    },
    data: [{
      type: "column", //?change type to column, line, area, doughnut, etc
      dataPoints: [{}] 
      /*
      [
      { label: "Oficial", y: 369 },
      { label: "Mayorista", y: 353 },
      { label: "Solidario", y: 646 },
      { label: "CCL", y: 852 },
      { label: "Bolsa", y: 854 },
      { label: "Blue", y: 950 }
      ]*/
    }]
  }
   //*----------------Grafico----------------------------*//
  
  constructor (private currencyService: CurrencyService) { }
  
  ngOnInit(): void {
    this.showDollars();
    this.fetchData();    
  }


 //*----------------Grafico----------------------------*//
  fetchData() {
    this.currencyService.getDollars().subscribe((data: Icurrency[]) => {
      data.forEach(d => {
        this.labels.push(d.nombre);
        this.data.push(d.venta);
      });
      this.chartOptions.data[0].dataPoints = this.data.map((value, index) => {
        return { label: this.labels[index], y: value };
      });
    });
  }
 //*----------------Grafico----------------------------*//


  showDollars() {
    this.currencyService.getDollars()    
    .subscribe(
      {
        next: (data) => {
          this.dolarList = data
        },
        error: (error) => {
          console.error(error)
        }
    });
  }

  formatDateHour(dateHour: string) {
    let fechaHora = new Date('2023-11-19T11:50:00.000Z');
    let fecha = fechaHora.toLocaleDateString();
    let hora = fechaHora.toLocaleTimeString();
    let resp = hora + ' - ' + fecha;
    return resp; 
  }


}
