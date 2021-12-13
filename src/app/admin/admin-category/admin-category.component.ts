import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public categoryArray: Array<ICategoryResponse> =[]
  public categoryForm!: FormGroup
  public btnAdd = true
  public currentID!: number

  constructor(
    private category:CategoryService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCategory()
    this.initForm()
  }

  initForm():void{
    this.categoryForm = this.fb.group({
      name: [null, Validators.required] 
    })
  }

  loadCategory():void{
    this.category.getAll().subscribe(data => {
      this.categoryArray = data      
    },err =>{
      console.log(err);
      
    })
  }

  createCategory():void{
    this.category.create(this.categoryForm.value).subscribe( () =>{
      this.loadCategory()
      this.categoryForm.reset()
    } )
  }

  editCategory(category: ICategoryResponse):void{
    this.categoryForm.patchValue(category)
    this.btnAdd = false
    this.currentID = category.id
  }

  saveEdit():void{
    this.category.update(this.categoryForm.value, this.currentID).subscribe( () => {
      this.loadCategory()
      this.categoryForm.reset()
      this.btnAdd = true
    } )
  }

  deleteCategory(category:ICategoryResponse):void{
    this.category.delete(category.id).subscribe(() => {
      this.loadCategory()
    })
  }



  

}
