import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrderRequest } from 'src/app/shared/interfaces/order.interface';
import { IUserResponse } from 'src/app/shared/interfaces/users.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/oerder/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderTemlate = true
  public confirmedOrder = false
  public orderProducts: Array<any> = []
  public user: Array<IUserResponse> =[]
  public total = 0
  public orderForm!: FormGroup;
  public status = 'pending'

  constructor(
    private fb:FormBuilder,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadLoginUser()
    this.initOrderForm()
    this.loadbasket()
    this.setTotal()
  }

  initOrderForm():void{
    this.orderForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      delivery: [null, Validators.required],
      city: [null, Validators.required],
      adress: [null, Validators.required],
      payment: [null, Validators.required],
      date: [new Date],
      status: [this.status]
    })
  
  }

  loadLoginUser():void{
    if (localStorage.length > 0 && localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user') as string)
      console.log(this.user);
    }
  }

  loadbasket():void{
    if (localStorage.length > 0 && localStorage.getItem('basket')){
      this.orderProducts = JSON.parse(localStorage.getItem('basket') as string)
    }
    else{
      this.orderProducts = []
    }
  }

  setTotal():void{
    if (this.orderProducts.length === 0){
      this.total = 0
    } else {
      this.total = this.orderProducts.reduce((total,p)=> total + p.price * p.orderCount,0)
    }
  }

  changeDelivery(element: HTMLInputElement):void{
    this.orderForm.patchValue({
      delivery: element.value
    })  
  }

  changePayment(element: HTMLInputElement): void{
    this.orderForm.patchValue({
      payment: element.value
    })
  }

  confirmOrder(): void {
    const order = {
      ...this.orderForm.value,
      basket: this.orderProducts,
    }
    this.orderService.create(order).subscribe(() => {
      localStorage.removeItem('basket')
      this.orderService.changeBasket.next(false)
      this.loadbasket()
      console.log(this.orderProducts);
      
    }, err => {
      console.log(err);
    })
    if (this.user.length > 0 ){
      this.user[0].orders.push(order)
      const ID = this.user[0].id
      this.authService.update(this.user[0], ID).subscribe(()=> {
      console.log();
      },err => {
        console.log(err);
      })
      localStorage.setItem('user',JSON.stringify(this.user))
      this.orderService.confirmOrder.next(this.user)
    }
    else{
    }
    this.orderTemlate = false
    this.confirmedOrder =true
  }
}
