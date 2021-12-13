import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ITyresResponse } from 'src/app/shared/interfaces/tyres.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Storage, ref, deleteObject, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  public tyres = true
  public wheels = false
  public moto = false
  public track = false
  public selectedFile!: File
  public isUploaded = false;
  public uploadPercent!: number;


  constructor(
    private storage: Storage,
    private route: Router
  ) { }

  ngOnInit(): void {
 
  }

  tyresActive():void{
    this.tyres = true
    this.wheels = false
    this.moto = false
    this.track = false
  }

  wheelsActive():void{
    this.tyres = false
    this.wheels = true
    this.moto = false
    this.track = false
  }

  motoActive():void{
    this.tyres = false
    this.wheels = false
    this.moto = true
    this.track = false
  }

  trackActive():void{
    this.tyres = false
    this.wheels = false
    this.moto = false
    this.track = true
  }

  

 



}
