import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { GenericListFilterModule } from 'generic-list-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import {WalletTransactionComponent} from './wallet-transaction/wallet-transaction.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IncomeComponent } from './income/income.component';
import { LabourComponent } from './labour/labour.component';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WorkComponent,
    WalletTransactionComponent,
    IncomeComponent,
    LabourComponent,
    BankTransferComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
