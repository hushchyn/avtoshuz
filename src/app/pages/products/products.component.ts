import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { OrderService } from 'src/app/shared/services/oerder/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public eventSubscription!: Subscription
  public subscription!: Subscription
  public productList!: Array<any>
  public currentCategory!: string
  public pageNumbers = 1
  public queryParam = '';

  constructor(
    private products: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private order: OrderService,
    public location: Location
    ) { 
      this.eventSubscription = this.router.events.subscribe( event => {
        if ( event instanceof NavigationEnd){
          const category = activatedRoute.snapshot.paramMap.get('category')
          // this.loadProducts(category as string)
          this.loadFilterProducts()
        } 
      })
    }
    
  ngOnInit(): void {
    this.loadFilterProducts()
  }

  loadProducts(product: string):void{
    this.currentCategory = product
    this.products.getByCategory(product).subscribe( data => {
      this.productList = data
    },err => {
      console.log(err);
    })
  }


  loadFilterProducts():void{
    this.products.getFilterProduct.subscribe(data =>{
      console.log(data);
      this.productList = data
    })
    this.products.getFilterProduct.next(true)
  }


  changeCount(product: ITyresResponse, status: boolean){
    if (status){
      ++product.orderCount
    }
    else{
      --product.orderCount
    }
  }

  addToBasket(product: ITyresResponse):void{
    let basket: ITyresResponse[] = []
    if (localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string)
      if (basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex( prod => prod.id === product.id)
        basket[index].orderCount += product.orderCount
      }
      else {
        basket.push(product)
      }
    }
    else {
      basket.push(product)
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    product.orderCount = 1
    this.order.changeBasket.next(true)
  }

  pageNum(num:number):void{
    this.activatedRoute.queryParams.subscribe(param => {
      if ( Object.keys(param).length > 0){
        this.queryParam = param.param
      }
      else{
        this.queryParam
      }
    })    
    let a = '' + num
    this.products.getByCategory(this.currentCategory,a,this.queryParam).subscribe(data => {
      this.productList = data
    }, err => {
      console.log(err);
    })
    
  }



  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

}
