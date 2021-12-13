import { Component, OnInit } from '@angular/core';
import { ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { OrderService } from 'src/app/shared/services/oerder/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public products: Array<any> = [];
  public total = 0

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBAsket()
  }

  loadBAsket():void{
    if (localStorage.length > 0 && localStorage.getItem('basket')){
      this.products = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.setTotal()
  }

  setTotal():void{
    if (this.products.length === 0){
      this.total = 0
    }
    else {
      this.total = this.products.reduce((total,p)=> total + p.price * p.orderCount,0)
    }
  }

  changeCount(product: ITyresResponse, status: boolean){
    if (status){
      ++product.orderCount
    }
    else{
      --product.orderCount
    }
    this.setTotal()
  }

  removeProduct(product: ITyresResponse):void{  
    const INDEX = this.products.findIndex( prod => prod.id === product.id)
    this.products.splice(INDEX,1)
    localStorage.setItem('basket', JSON.stringify(this.products))   
    this.orderService.changeBasket.next(this.products);
    this.loadBAsket()
}


  
}
