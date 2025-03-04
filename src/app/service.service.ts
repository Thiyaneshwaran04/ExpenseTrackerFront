import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://expense-tracker123-ten.vercel.app';

  constructor( private http:HttpClient) { }
  gethome(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/home`)
  }

  getwork(){
    return this.http.get(`${this.apiUrl}/work`)

  }

  postwork(date:any,material:any,unit:any,cost:any,paymentMethod:any,submaterial:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/work`, { date,material,unit,cost,paymentMethod ,submaterial}, { headers });
  }

  getwallet(){
    return this.http.get(`${this.apiUrl}/wallet`)

  }
  postwallet(date:any,category:any,amount:any,subcategory:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/wallet`, { date,category,amount,subcategory }, { headers });
  }
  getwallettransaction(){
    return this.http.get(`${this.apiUrl}/wallet`)

  }
  getlabour(){
    return this.http.get(`${this.apiUrl}/labour`)

  }
  postLabour(date:any,labourname:any,workingDays:any,perday:any,salary:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/labour`, { date,labourname,workingDays,perday,salary}, { headers });
  }
  postHomeFilter(Labourname:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/labour/filter`,{Labourname}, { headers });
  }
  postwalletFilter(category:any,subcategory:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/wallet/filter`,{category,subcategory}, { headers });
  }
  postworkFilter(material:any,submaterial:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/work/filter`,{material,submaterial}, { headers });
  }
  getbankTransfer(){
    return this.http.get(`${this.apiUrl}/banktransfer`)

  }
}
