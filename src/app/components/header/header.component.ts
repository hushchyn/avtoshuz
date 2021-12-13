import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITyresRequest, ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { IUserResponse } from 'src/app/shared/interfaces/users.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/oerder/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;

  public signInBtn = true
  public signUpBtn = false
  public formLoginUser!: FormGroup | null
  public formRegisterUser!: FormGroup
  public users: Array<object> = [];
  public total = 0
  public basket!: Array<ITyresResponse>
  public isUserLogin = false
  public isAdminLogin = false
  public nameUser!: Array<IUserResponse>

 constructor(
  private fb: FormBuilder,
  private auth: AuthService,
  private order: OrderService,
  private router: Router,
  private toastr: ToastrService,
  private productService: ProductsService
  ) { }

 ngOnInit(): void {
   this.initRegisterForm()
   this.initFormUser()
   this.loadUsers()
   this.loadBasket()
   this.checkChangeBasket()
   this.checkLogin()
  }

  initFormUser():void{
    this.formLoginUser = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]]
    })
  }

  initRegisterForm():void{
    this.formRegisterUser = this.fb.group({
      email:[null, Validators.required],
      phone:[null, Validators.required],
      password:[null, Validators.required],
      firstName: '',
      lastName: '',
      orders: [],
      role:'USER',
    })
  }

  loadUsers():void{
    this.auth.getAll().subscribe(data => {
    })
  }

  resgisterUser():void{
    this.auth.create(this.formRegisterUser.value).subscribe(()=>{
      this.loadUsers()
      this.formRegisterUser.reset()
    })
  }

  signUpActive():void{
    this.signInBtn = false
    this.signUpBtn = true
  }

  signInActive():void{
    this.signInBtn = true
    this.signUpBtn = false
  }

  getUsers():void{}

  signIn(): void {
    const LOGINANDPASS = this.formLoginUser?.value
    let user: IUserResponse[] = []
    this.auth.getAll().subscribe(data => {
      user = data
      const currentUser = user.filter(u => u.email === LOGINANDPASS.email && u.password === LOGINANDPASS.password)
      this.nameUser = currentUser
      if (currentUser.length > 0) {
        localStorage.setItem('user', JSON.stringify(currentUser))
        if (currentUser && currentUser[0].role === 'ADMIN') {
          this.router.navigate(['admin'])
          this.close.nativeElement.click()
          this.isAdminLogin = true
          this.isUserLogin = false
        } else if (currentUser && currentUser[0].role === 'USER') {
          this.router.navigate(['profile'])
          this.close.nativeElement.click()
          this.isAdminLogin = false
          this.isUserLogin = true
        }
      } else {
        this.isAdminLogin = false
        this.isUserLogin = false
        this.toastr.error('Будь-ласка зареєструйтесь',);
      }
    })
    this.formLoginUser?.reset()
  }

loadBasket():void{
  if(localStorage.length > 0 && localStorage.getItem('basket')){
    this.basket = JSON.parse(localStorage.getItem('basket') as string)
  } else{
    this.basket = []
  }
  this.setTotalCount()
}

setTotalCount():void{
  if (this.basket.length === 0){
    this.total = 0
  }else{
    this.total = this.basket.length
  }
}

checkChangeBasket():void{
  this.order.changeBasket.subscribe(() => {
    this.loadBasket()
  })
}

checkLogin():void{
  this.auth.currentUser$.subscribe(()=>{
    this.signIn()
  })
}

navigateTo(category: string):void{
  this.productService.getByCategory(category).subscribe(data => {
    console.log(data);
    this.productService.getFilterProduct.next(data)
  })
  this.router.navigate([`${category}`])
}



}
