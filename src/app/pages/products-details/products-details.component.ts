import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { OrderService } from 'src/app/shared/services/oerder/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  public currentProduct!: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private order: OrderService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct():void{
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.productService.getOne(id).subscribe(data => {
       this.currentProduct = data
       console.log(data);
       
    }, err => {
      console.log(err);
    })
  }

  changeCount(product: ITyresResponse, status: boolean){
    if (status){
      ++product.orderCount
    }
    else{
      --product.orderCount
    }
  }

  addToBasket():void{
    let basket: ITyresResponse[] = []
    if (localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string)
      if (basket.some(prod => prod.id === this.currentProduct.id)){
        const index = basket.findIndex( prod => prod.id === this.currentProduct.id)
        basket[index].orderCount += this.currentProduct.orderCount
      }
      else {
        basket.push(this.currentProduct)
      }
    }
    else {
      basket.push(this.currentProduct)
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    this.currentProduct.orderCount = 1
    this.order.changeBasket.next(true)
  }

}
