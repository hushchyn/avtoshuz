import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOrderResponse } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/oerder/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  public field!: string
  public new =  true
  public inProgress = false
  public archive = false
  public newOrders: Array<any> = []
  public confirmedOrders: Array<any> = []
  public form!: FormGroup
  public currentOrder!: IOrderResponse

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders():void{
    this.orderService.getAll().subscribe( data=> { 
     if (data.find (d => d.status === 'pending')){
      this.newOrders = data.filter(d => d.status === 'pending')
     }
     if (data.find (d => d.status === 'confirmed')){
      this.confirmedOrders = data.filter(d => d.status === 'confirmed')
     }
     else{
      this.newOrders = this.newOrders
      this.confirmedOrders = this.confirmedOrders
     }  
    },err => {
      console.log(err);
    })
  }

  newOrder():void{
    this.new = true
    this.inProgress = false
    this.archive = false
  }

  inProgressOrder():void{
    this.new = false
    this.inProgress = true
    this.archive = false
  }

  confirmOrder(order: IOrderResponse):void{
    this.currentOrder = order
    const INDEX = this.newOrders.findIndex(prod => prod.id === order.id)
    this.currentOrder.status = 'confirmed'
    this.newOrders.splice(INDEX,1)
    this.orderService.update(this.currentOrder, order.id).subscribe(()=> {
      this.loadOrders()
    })
   
  }

 

}
