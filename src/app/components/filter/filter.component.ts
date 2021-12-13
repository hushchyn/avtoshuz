import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { ParametersService } from 'src/app/shared/services/parameters/parameters.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  public eventSubscription!: Subscription
  public productList!: Array<any>
  public productBrands!: Array<any>
  public productWidth!: Array<any>
  public productHeight!: Array<any>
  public productDia!: Array<any>
  public field!: any
  public formFilter!: FormGroup
  public filterParameters = ''
  public category= ''
  public nn =''
  public pageNumber = 1
  public queryParams = {}

  constructor(
    private products: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private param: ParametersService
    ) { 
      this.eventSubscription = this.router.events.subscribe( event => {
        if (event instanceof NavigationEnd){
          const categoryName = this.activatedRoute.snapshot.paramMap.get('category')
          this.loadProducts(categoryName as string)
          this.category = categoryName as string
        }
      })
    }

  ngOnInit(): void {
    this.allParam()
    this.initFormFilter()
    this.loadFilterParams()
  }

  initFormFilter():void{
    this.formFilter = this.fb.group({
      width:[''],
      height: [''],
      dia: [''],
      season:[''],
      brand: [this.nn]
    })
  }

  loadFilterParams():void{
    this.products.queryParams.subscribe(params => {
      this.queryParams = params
    console.log(this.queryParams);
    this.formFilter.patchValue(this.queryParams)
    console.log(this.formFilter);
    
    })
    // this.formFilter.patchValue({
    //   width: this.queryParams.
    // })
  }

  checkedBrand(brand:string):void{

  }

  loadProducts(product: string):void{
    this.products.getByCategory(product).subscribe( data => {
      this.productList = data
        },err => {
      console.log(err);
    })
  }

  allParam():void{
    this.param.loadParam().subscribe( data => {
      const BRAND = data[0].brands
      const WIDTH = data[1].width
      const HEIGHT = data[2].height
      const DIA = data[3].radius
      this.productBrands = BRAND
      this.productWidth = WIDTH
      this.productHeight = HEIGHT
      this.productDia = DIA
    })
  }

  filterProducts():void{
    if (this.formFilter.value.width != ''){
      this.filterParameters = 'width.param=' +  this.formFilter.value.width.param
    }
    else{
      this.filterParameters
    }
    if (this.formFilter.value.height != ''){
      this.filterParameters += '&height.param='+ this.formFilter.value.height.param
    }
    else{
      this.filterParameters 
    }
    if ( this.formFilter.value.dia != ''){
      this.filterParameters += '&dia.param='+ this.formFilter.value.dia.param
    }
    else{
      this.filterParameters
    }
    if (this.formFilter.value.brand != ''){
      this.filterParameters += '&brand.name='+ this.formFilter.value.brand.name
    }
    console.log(this.filterParameters);
    
    this.products.getByCategory(this.category,this.filterParameters).subscribe( data => {
      console.log(data);
      this.products.getFilterProduct.next(data)
    },err => {
      console.log(err);
    })
  }

  

}
