import { Component, OnInit} from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.css']
})
export class LabourComponent implements OnInit {

      constructor(public service:ServiceService) { }
     
  ngOnInit(){
    this.getLabour()
    this.loadCategories()
  }
  showModal = false;
labourTransaction:any;
labourList: { name: any; perday: any[]; }[] = []; 
searchText: string = '';
 

  filteredLabourList = [...this.labourList]; // Initialize with all data
  newLabour = {
    date: '',
    labourname: '',
    perday: 0,
    salary: 0,
    workingDays
:0
  };
  labournames:any
  perdaysal:any
  subcategories: string[] = [];
  isOtherCategory: any;
  filtername:any
getLabour(){
  this.service.getlabour().subscribe((res:any)=>{
    this.labourTransaction=res.data
    console.log(res);
    
  })
}
searchLabour() {
  this.filteredLabourList = this.labourList.filter(labour =>
    labour.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
  console.log(this.filteredLabourList);
  
}
toggleSubcategories(category: any) {
  category.showSubcategories = !category.showSubcategories;
}
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newLabour = { date: '', labourname: '', perday: 0, salary: 0,workingDays
      : 0 };
  }

  updateSalary() {
    const selectedLabour = this.labourList.find(labour => labour.name === this.newLabour.labourname);
    if (selectedLabour) {
      this.newLabour.perday = selectedLabour.perday[0] || 0; // Get first salary or default to 0
      this.calculateTotalAmount();
    }
  }
  
  calculateTotalAmount() {
    this.newLabour.salary= this.newLabour.perday * this.newLabour.workingDays
    ;
  }

  addLabour() {
    if (this.newLabour.labourname && this.newLabour.salary > 0 && this.newLabour.perday > 0) {
     this.service.postLabour(this.newLabour.date,this.newLabour.labourname,this.newLabour.workingDays
      ,
      this.newLabour.perday,this.newLabour.salary).subscribe((res:any)=>{
        this.labourTransaction.push(res.data)
     this.getLabour()

     })
     console.log(this.newLabour,"gy");
     
      this.closeModal();
    }
  }
    
  addCategory() {
    if (this.labournames.trim()) {
      // Check if the category already exists
      let existingCategory = this.labourList.find(cat => cat.name.toLowerCase() === this.labournames.toLowerCase());
  
      if (existingCategory) {
        // If category exists, add the subcategory if it's not already added
        if (this.perdaysal.trim() && !existingCategory.perday.includes(this.perdaysal.trim())) {
          existingCategory.perday.push(this.perdaysal.trim());
          this.saveCategories();
          this.clearInputs();
        } else {
          alert('Subcategory already exists or no subcategory entered!');
        }
      } else {
        // If category doesn't exist, create a new category with the subcategory
        this.labourList.push({
          name: this.labournames,
          perday: this.perdaysal ? [this.perdaysal] : []
        });
        this.saveCategories();
        this.clearInputs();
      }
    } else {
      alert('Please enter a category name.');
    }
  }
  
  getFilter(){
    console.log(this.filtername);
    
    this.service.postHomeFilter(this.filtername).subscribe((res:any)=>{
      this.labourTransaction=''
      this.labourTransaction=res.data
    })
  }
clear(){
  this.labourTransaction=''
  this.filtername=''
  this.getLabour()
}
  saveCategories() {
    localStorage.setItem('LabourList', JSON.stringify(this.labourList));
  }

  loadCategories() {
    let storedCategories:any = localStorage.getItem('LabourList');
 
    if (storedCategories) {
      this.labourList = JSON.parse(storedCategories);
    }
  }

  clearInputs() {
    this.labournames = '';
    this.perdaysal = '';
  }
}