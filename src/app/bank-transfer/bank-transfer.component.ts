import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css']
})
export class BankTransferComponent implements OnInit {
bankTransfer:any
  constructor( public service:ServiceService) { }

  ngOnInit(): void {
   this.get()
  }


  get(){
    this.service.getbankTransfer().subscribe((res:any)=>{
      
      this.bankTransfer=res.data
    })
  }
}
