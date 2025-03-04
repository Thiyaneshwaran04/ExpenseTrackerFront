import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { WalletTransactionComponent } from './wallet-transaction/wallet-transaction.component';
import { IncomeComponent } from './income/income.component';
import { LabourComponent } from './labour/labour.component';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'Work',component:WorkComponent},
  {path:'walletTransaction',component:WalletTransactionComponent},
  {path:'income',component:IncomeComponent},
  {path:'labour',component:LabourComponent},
  {path:'banktransfer',component:BankTransferComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
