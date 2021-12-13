import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.scss']
})
export class MotoComponent implements OnInit {
  public productForm!: FormGroup
  public categories: Array<ICategoryResponse> = []
  public adminProducts: Array<any>=[]
  public currentID!: number
  public editStatus = false
  public eventSubscription!: Subscription
  public productType = 'moto'

  constructor(
    private category: CategoryService,
    private product: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
 

  ngOnInit(): void {
    this.initForm()
    this.loadCategory()
    this.loadProductByCategory(this.productType)
  }

  initForm():void{
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      path: [null, Validators.required],
      brand: [null, Validators.required],
      model: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
      dia: [null, Validators.required],
      season: [null, Validators.required],
      count: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: 'url(assets/styles/images/motoProduct.jpg)'
    })
  }

  loadCategory():void{
    this.category.getAll().subscribe(data => {
      this.categories = data 
    }, err => {
      console.log(err);
    })
  }

   loadProductByCategory(productType: string):void{
   this.product.getByCategory(productType).subscribe(data => {
     this.adminProducts = data
   })
  }

  createTyre():void{
    this.product.create(this.productForm.value).subscribe(() => {
      this.loadProductByCategory(this.productForm.get('category')?.value.name)
      this.productForm.reset()
    },err => {
      console.log(err);
    })
  }

  editProduct(product:any):void{
    this.productForm.patchValue(product)
    this.editStatus = true
    this.currentID = product.id
  }

  saveProduct():void{
    this.product.update(this.productForm.value,this.currentID).subscribe( ()=> {
      this.loadProductByCategory(this.productForm.get('category')?.value.name)
      this.productForm.reset()
    },err => {
      console.log(err);
    })
  }

  deleteProduct(product: ITyresResponse):void{
    this.product.delete(product.id).subscribe( ()=> {
      this.loadProductByCategory(product.category.name)
    })
  }

}
