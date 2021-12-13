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
  selector: 'app-tyres',
  templateUrl: './tyres.component.html',
  styleUrls: ['./tyres.component.scss']
})
export class TyresComponent implements OnInit {

  public productForm!: FormGroup
  public categories: Array<ICategoryResponse> = []
  public adminProducts: Array<any>=[]
  public currentID!: number
  public editStatus = false
  public eventSubscription!: Subscription
  public productType = 'tyres'
  public productBrands!: Array<any>
  public productWidth!: Array<any>
  public productHeight!: Array<any>
  public productDia!: Array<any>
  public productSeazon!: Array<any>

  constructor(
    private category: CategoryService,
    private product: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private parameters: ParametersService
  ) { this.eventSubscription = this.router.events.subscribe( event => {
          // if (event instanceof NavigationEnd){
          //   console.log(event);
          //    const categoryName = this.activatedRoute.snapshot.paramMap.get('tyres')
          //   this.loadProductByCategory(categoryName as string)
          //    }
           })
   }
 

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
      width: [null, Validators.required],
      height: [null, Validators.required],
      dia: [null, Validators.required],
      speed: [null, Validators.required],
      weight: [null, Validators.required],
      season: [null, Validators.required],
      orderCount: [1],
      count: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: 'url(assets/styles/images/tyreProduct.png)',
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
    this.parameters.loadParam().subscribe(data => {
      const BRAND = data[0].brands
      const WIDTH = data[1].width
      const HEIGHT = data[2].height
      const DIA = data[3].radius
      const SEAZON = data[4].season
      this.productBrands = BRAND
      this.productWidth = WIDTH
      this.productHeight = HEIGHT
      this.productDia = DIA
      this.productSeazon = SEAZON
    })
  }

   loadProductByCategory(productType: string):void{
   this.product.getByCategory(productType).subscribe(data => {
     this.adminProducts = data
     console.log(data);
          
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
    this.editStatus = false
    this.productForm.reset()
    
  }

  deleteProduct(product: ITyresResponse):void{
    this.product.delete(product.id).subscribe( ()=> {
      this.loadProductByCategory(product.category.name)
    })
  }

  // ngOnDestroy(): void {
  //   this.eventSubscription.unsubscribe();
  // }

  

}
