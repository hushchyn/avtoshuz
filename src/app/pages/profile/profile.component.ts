import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrderResponse } from 'src/app/shared/interfaces/order.interface';
import { IUserResponse } from 'src/app/shared/interfaces/users.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/oerder/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile = true
  public orders = false
  public future = false
  public add = true
  public save = false
  public currentUser!: Array<any>
  public currentID!: number
  public userForm!: FormGroup
  public currentOrder!: IOrderResponse

  constructor(
    private route: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private orderService: OrderService
    ) { }
  
  ngOnInit(): void {
    this.loadUser()
    this.initUserForm()
    this.loadOrders()
  }

  initUserForm():void{
    this.userForm = this.fb.group({
      firstName: [this.currentUser[0].firtsName],
      lastName: [this.currentUser[0].lastName],
      email: [this.currentUser[0].email],
      phone: [this.currentUser[0].phone],
      role: [this.currentUser[0].role],
      password: [this.currentUser[0].password],
      orders:[this.currentUser[0].orders]
    })
  }

  profileActive():void{
    this.profile = true
    this.orders = false
    this.future = false
  }

  ordersActive():void{
    this.profile = false
    this.orders = true
    this.future = false
    console.log(this.currentUser);
    
  }

  futureActive():void{
    this.profile = false
    this.orders = false
    this.future = true
  }

  addAdress(){
    this.add = false
    this.save = true
  }

  saveAdress(){
    this.add = true
    this.save= false
  }

  signOut():void{
      this.auth.logOut()
  }

  loadUser():void{
    if (localStorage.length > 0 && localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user') as string)
      this.currentID = this.currentUser[0].id
      console.log(this.currentUser[0].orders[0].basket[0].brand.name);
      
      
      
    }
  }

  saveInfo():void{
    this.auth.update(this.userForm.value,this.currentID).subscribe(()=> {
      this.loadUser()
    },err => {
      console.log(err);
    })
  }

  loadOrders():void{
    this.orderService.confirmOrder.subscribe( data => { 
      this.loadUser()
      
    })
  }




}
