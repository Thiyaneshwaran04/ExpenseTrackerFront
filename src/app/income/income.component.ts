import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {



  newTransaction: {
    date: string;
    category: string;
    subcategory?: string;  // Make sure it's defined
    amount: number | null;
  } = {
    date: '',
    category: '',
    subcategory: '', // Initialize it
    amount: null
  };
 categories: { name: any; subcategories: any[]; }[] = []; 

  categ: string = ''; // Category input
  subcateg: string = ''; // Subcategory input

  isModalOpen = false;
  walletTransaction:any;
  subcategories: string[] = [];
  isOtherCategory: any;
  isOtherCategorys= false;

  filtercat: any;
  filtersubcat:any
  subcategoriess: string[] = [];

  constructor(public service:ServiceService) { }

  ngOnInit(): void {
   this.getwallet()
   this.loadCategories()
   }

   getFilter(){
    console.log(this.filtercat);
    
    this.service.postwalletFilter(this.filtercat,this.filtersubcat).subscribe((res:any)=>{
      this.walletTransaction=''
      this.walletTransaction=res.data
      console.log(res.data);
      
    })
  }
clear(){
  this.walletTransaction=''
  this.filtercat=''
  this.getwallet()
}
   onCategoryChange() {
    const selectedCategory = this.categories.find(c => c.name === this.newTransaction.category);
    
    if (selectedCategory) {
      this.subcategories = selectedCategory.subcategories;
      
      if (this.newTransaction.category === 'Others') {
        this.isOtherCategory = true;  // Enable manual input
        this.newTransaction.subcategory = ''; // Reset subcategory field
      } else if (this.newTransaction.category === 'GrandMa' || this.newTransaction.category === 'Perima') {
        this.isOtherCategory = false;
        this.newTransaction.subcategory = '-'; // Default to dash
      }
      else {
        this.isOtherCategory = false;
        this.newTransaction.subcategory = this.subcategories.length > 0 ? '' : undefined;

      }
    } else {
      this.subcategories = [];
      this.newTransaction.subcategory = '';
    }
  }
  onChange() {
    const selectedCategory = this.categories.find(c => c.name === this.filtercat);
    
    if (selectedCategory) {
      this.subcategoriess = selectedCategory.subcategories;
      this.isOtherCategorys = true;
      
    } 
  }
   toggleSubcategories(category: any) {
    category.showSubcategories = !category.showSubcategories;
  }
  getwallet() {
    this.service.getwallettransaction().subscribe((res: any) => {
      console.log(res);
  
      if (Array.isArray(res.data)) {
        this.walletTransaction = res.data.filter((transaction: any) => 
          transaction.amount !== undefined && transaction.amount !== null && transaction.amount.toString().includes('-') === false
        );
      } else {
        console.error("Error: walletTransaction is not an array", res.data);
        this.walletTransaction = []; // Set it to an empty array if it's not an array
      }
  
      console.log(this.walletTransaction);
    });
  }
  
  

  openTransactionModal() {
    this.isModalOpen = true;
  }

  closeTransactionModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  addTransaction() {
    console.log("Submitting Transaction:", this.newTransaction);
  
    if (this.newTransaction.date && 
        this.newTransaction.category &&
        (this.newTransaction.subcategory !== '' || this.isOtherCategory) &&
        this.newTransaction.amount !== null) {
  
      console.log("Transaction is valid, submitting...");
  
      this.service.postwallet(
        this.newTransaction.date,
        this.newTransaction.category,
        this.newTransaction.amount,
        this.newTransaction.subcategory
      ).subscribe((res: any) => {
        this.walletTransaction.push(res.data);
        this.getwallet();
      });
  
      this.closeTransactionModal();
    } else {
      alert('Please fill all fields correctly.');
    }
  }
  
  resetForm() {
    this.newTransaction = { date: '', amount: null, category: '', subcategory: '' };
  }
 
  addCategory() {
    if (this.categ.trim()) {
      // Check if the category already exists
      let existingCategory = this.categories.find(cat => cat.name.toLowerCase() === this.categ.toLowerCase());
  
      if (existingCategory) {
        // If category exists, add the subcategory if it's not already added
        if (this.subcateg.trim() && !existingCategory.subcategories.includes(this.subcateg.trim())) {
          existingCategory.subcategories.push(this.subcateg.trim());
          this.saveCategories();
          this.clearInputs();
        } else {
          alert('Subcategory already exists or no subcategory entered!');
        }
      } else {
        // If category doesn't exist, create a new category with the subcategory
        this.categories.push({
          name: this.categ,
          subcategories: this.subcateg.trim() ? [this.subcateg.trim()] : []
        });
        this.saveCategories();
        this.clearInputs();
      }
    } else {
      alert('Please enter a category name.');
    }
  }
  
  

  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }
  }

  clearInputs() {
    this.categ = '';
    this.subcateg = '';
  }
}