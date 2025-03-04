import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-wallet-transaction',
  templateUrl: './wallet-transaction.component.html',
  styleUrls: ['./wallet-transaction.component.css']
})
export class WalletTransactionComponent implements OnInit {

  
  walletTransaction:any;


  constructor(public service:ServiceService) { }

  ngOnInit(): void {
   this.getwallet()
   }
  
   getwallet() {
    this.service.getwallettransaction().subscribe((res: any) => {
      console.log(res);
      
      if (Array.isArray(res.data)) {
        this.walletTransaction = res.data;
      } else {
        console.error("Error: walletTransaction is not an array", res.data);
        this.walletTransaction = []; // Set it to an empty array if it's not an array
      }
  
      console.log(this.walletTransaction);
    });
  }
  

 
}
