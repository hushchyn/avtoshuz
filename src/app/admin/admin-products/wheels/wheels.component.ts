import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ParametersService } from 'src/app/shared/services/parameters/parameters.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-wheels',
  templateUrl: './wheels.component.html',
  styleUrls: ['./wheels.component.scss']
})
export class WheelsComponent implements OnInit {
    public productForm!: FormGroup
    public categories: Array<ICategoryResponse> = []
    public adminProducts: Array<any>=[]
    public currentID!: number
    public editStatus = false
    public eventSubscription!: Subscription
    public productType = 'wheels'
    public wheelsBrand!: Array<any>
    public wheelsDiametr!: Array<any>
    public wheelsWidth!: Array<any>
    public wheelsPCD!: Array<any>
    public wheelsDia!: Array<any>
    public wheelsET!: Array<any>
    
  
    constructor(
      private category: CategoryService,
      private product: ProductsService,
      private fb: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private parameters: ParametersService
    ) { }
   
  
    ngOnInit(): void {
      this.initForm()
      this.loadCategory()
      this.loadProductByCategory(this.productType)
      this.loadParameters()
    }
  
    initForm():void{
      this.productForm = this.fb.group({
        category: [null, Validators.required],
        path: [null, Validators.required],
        brand: [null, Validators.required],
        model: [null, Validators.required],
        diametr: [null, Validators.required],
        width: [null, Validators.required],
        pcd: [null, Validators.required],
        ET: [null, Validators.required],
        DIA: [null, Validators.required],
        color: [null, Validators.required],
        count: [null, Validators.required],
        price: [null, Validators.required],
        imagePath: 'url(assets/styles/images/diskProduct.png)'
      })
    }
  
    loadCategory():void{
      this.category.getAll().subscribe(data => {
        this.categories = data 
      }, err => {
        console.log(err);
      })
    }

    loadParameters():void{
      this.parameters.loadParam().subscribe(data =>{
        const BRAND = data[5].brands
        const DIAMETR = data[6].diametr
        const WIDTH = data[7].width
        const PCD = data[8].PCD
        const DIA = data[9].DIA
        const ET = data[10].ET
        this.wheelsBrand = BRAND
        this.wheelsDiametr = DIAMETR
        this.wheelsWidth = WIDTH
        this.wheelsPCD = PCD
        this.wheelsDia = DIA
        this.wheelsET = ET
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