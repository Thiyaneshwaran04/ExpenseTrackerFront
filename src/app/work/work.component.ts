import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  material: any = []; // Change to any to avoid type conflicts

  materials: { name: any; subMaterials: any[]; }[] = []; 
subMaterials: string[] = []; // To store filtered sub-materials
isOtherMaterial = false;
  materialname:any;
  submaterial:any;
  filtermat: any;
  filtersubmat: any;
  isOtherMaterials=false;
  subMaterialss: string[] = [];
    constructor(public service:ServiceService) { }
  
    ngOnInit(){
      this.getdata()
      this.loadCategories()
    }
    toggleSubcategories(category: any) {
      category.showSubcategories = !category.showSubcategories;
    }
    getFilter(){
      console.log(this.filtermat);
      
      this.service.postworkFilter(this.filtermat,this.filtersubmat).subscribe((res:any)=>{
        this.material=''
        this.material=res.data
        console.log(res.data);
        
      })
    }
  clear(){
    this.material=''
    this.filtermat=''
    this.filtersubmat=''
    this.getdata()
  }
  addCategory() {
    if (this.materialname.trim()) {
      // Check if the category already exists
      let existingCategory = this.materials.find(cat => cat.name.toLowerCase() === this.materialname.toLowerCase());
  
      if (existingCategory) {
        // If category exists, add the subcategory if it's not already added
        if (this.submaterial.trim() && !existingCategory.subMaterials.includes(this.submaterial.trim())) {
          existingCategory.subMaterials.push(this.submaterial.trim());
          this.saveCategories();
          this.clearInputs();
        } else {
          alert('Subcategory already exists or no subcategory entered!');
        }
      } else {
        // If category doesn't exist, create a new category with the subcategory
        this.materials.push({
          name: this.materialname,
          subMaterials: this.submaterial.trim() ? [this.submaterial.trim()] : []
        });
        this.saveCategories();
        this.clearInputs();
      }
    } else {
      alert('Please enter a category name.');
    }
  }
  
  

  saveCategories() {
    localStorage.setItem('Materials', JSON.stringify(this.materials));
  }

  loadCategories() {
    const storedCategories = localStorage.getItem('Materials');
    if (storedCategories) {
      this.materials = JSON.parse(storedCategories);
    }
  }

  clearInputs() {
    this.materialname = '';
    this.submaterial = '';
  }
 
onMaterialChange() {
  const selectedMaterial = this.materials.find(m => m.name === this.newMaterial.material);

  if (selectedMaterial) {
    this.subMaterials = selectedMaterial.subMaterials;
    this.isOtherMaterial = false; // Hide manual input
    this.newMaterial.subMaterial = ''; // Reset sub-material field
  } else {
    this.subMaterials = [];
    this.isOtherMaterial = true; // Enable manual input for custom material
    this.newMaterial.subMaterial = '';
  } 
}
onChange() {
  const selectedMaterials = this.materials.find(m => m.name === this.filtermat);
console.log(selectedMaterials,"fdgh");

  if (selectedMaterials) {
    this.subMaterialss = selectedMaterials.subMaterials;
    this.isOtherMaterials = false; // Hide manual input
    this.newMaterial.subMaterial = ''; // Reset sub-material field
  } else {
    this.subMaterials = [];
    this.isOtherMaterial = true; // Enable manual input for custom material
    this.newMaterial.subMaterial = '';
  } 
}

    getdata() {
      this.service.getwork().subscribe(
        (res: any) => {
          console.log('API Response:', res);
    
          if (res && Array.isArray(res.data)) {
            this.material = res.data; // Assign only if it's an array
          } else {
            console.error('Invalid response format:', res.data);
            this.material = []; // Reset to empty array
          }
        },
        (error) => {
          console.error('API Error:', error);
          this.material = []; // Ensure table doesn't break
        }
      );
    }
    
    isModalOpen = false;
    newMaterial: { 
      date: string; 
      material: string; 
      subMaterial?: string;  // <-- Add this property
      unit: string; 
      cost: number; 
      paymentMethod: string;
    } = {
      date: '',
      material: '',
      subMaterial: '',  // <-- Initialize it
      unit: '',
      cost: 0,
      paymentMethod: ''
    };
    
  
    openModal() {
      this.isModalOpen = true;
    }
  
    closeModal() {
      this.isModalOpen = false;
      this.resetMaterialForm();
    }
  
    saveMaterial() {
      console.log('Payload being sent:', {
        date: this.newMaterial.date,
        material: this.newMaterial.material,
        unit: this.newMaterial.unit,
        submaterial: this.newMaterial.subMaterial,
        cost: this.newMaterial.cost,
        paymentMethod: this.newMaterial.paymentMethod
      });
      
      if (this.newMaterial.date ) {
        this.service.postwork(this.newMaterial.date ,this.newMaterial.material,this.newMaterial.unit,this.newMaterial.cost,this.newMaterial.paymentMethod,this.newMaterial.subMaterial).subscribe(
          (res:any) => {
            console.log('Response from API:', res.data);
            this.material.push(res.data)
            console.log(res,"trd");
            
            this.getdata();
        this.closeModal();
          },
          (error) => {
            console.error('Error from API:', error);
          }
        );
        
      }
       else {
        alert('Please fill all fields');
      }
      
    }
    
    resetMaterialForm() {
      this.newMaterial = { date: '', material: '', unit: '', cost: 0, paymentMethod: '' };
    }
  }
  
