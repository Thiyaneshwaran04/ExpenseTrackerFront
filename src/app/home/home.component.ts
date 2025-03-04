import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  walletAmount:any
  spendAmount:any
  RecentTransaction:any
  income: any;
  labour: any;
  constructor(public service:ServiceService) { }

  ngOnInit() {
    this.service.gethome().subscribe(res=>{
      this.spendAmount=res.data.Total
      this.RecentTransaction=res.data.RecentTransaction
      this.walletAmount=res.data.wallet
      this.income=res.data.income
      this.labour=res.data.labour
  console.log(res);
  
      
    });
 
    
  }

}
