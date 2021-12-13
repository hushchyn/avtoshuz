import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public category = true
  public products = false
  public orders = false
  public news = false

  constructor(
    private route:Router,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
  }

  categoryActive():void{
    this.category = true
    this.products = false
    this.orders = false
    this.news = false
  }

  productsActive():void{
    this.category = false
    this.products = true
    this.orders = false
    this.news = false
  }

  ordersActive():void{
    this.category = false
    this.products = false
    this.orders = true
    this.news = false
  }

  newssActive():void{
    this.category = false
    this.products = false
    this.orders = false
    this.news = true
  }

  signOut():void{
    this.auth.logOut()
  }

}
