import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParametersService } from 'src/app/shared/services/parameters/parameters.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public foo = true
  public qoo = false
  public btnCategoryTyres = true
  public btnCategoryDisk = false
  public btnCategoryMoto = false
  public btnCategoryTrack = false
  public categoryTyres = 'tyres'
  public categoryWheels = 'wheels'
  public categoryMoto = 'moto'
  public categoryTrack = 'track'
  public backGroundFilter = 'url(assets/styles/images/background.png)'
  public productBrands!: Array<any>
  public productWidth!: Array<any>
  public productHeight!: Array<any>
  public productDia!: Array<any>
  public productSeazon!: Array<any>
  public wheelsBrand!: Array<any>
  public wheelsDiametr!: Array<any>
  public wheelsWidth!: Array<any>
  public wheelsPCD!: Array<any>
  public wheelsDia!: Array<any>
  public wheelsET!: Array<any>
  public formFilter!: FormGroup
  public filterParameters = ''

  constructor(
    private parameters: ParametersService,
    private fb: FormBuilder,
    private productService: ProductsService,
    public router: Router
    ) {}

  ngOnInit(
  ): void {
    this.loadParameters()
    this.initFilter()
  }

  initFilter():void{
    this.formFilter = this.fb.group({
      width: [''],
      height: [''],
      dia: [''],
      season: [''],
      brand: [''],
    })
  }

  tyreCategory():void{
    this.btnCategoryTyres = true
    this.btnCategoryDisk = false
    this.btnCategoryMoto = false
    this.btnCategoryTrack = false
    this.backGroundFilter = 'url(assets/styles/images/background.png)'
  }

  diskCategory():void{
    this.btnCategoryTyres = false
    this.btnCategoryDisk = true
    this.btnCategoryMoto = false
    this.btnCategoryTrack = false
    this.foo = false
    this.qoo = true
    this.backGroundFilter = 'url(assets/styles/images/diskBackground.png)'
  }

  motoCategory():void{
    this.btnCategoryTyres = false
    this.btnCategoryDisk = false
    this.btnCategoryMoto = true
    this.btnCategoryTrack = false
    this.backGroundFilter = 'url(assets/styles/images/motoBack.png)'
  }

  trackCategory():void{
    this.btnCategoryTyres = false
    this.btnCategoryDisk = false
    this.btnCategoryMoto = false
    this.btnCategoryTrack = true
    this.backGroundFilter = 'url(assets/styles/images/trackBackground.png)'
  }

loadParameters():void{
  this.parameters.loadParam().subscribe( data => {
    const BRANDT = data[0].brands
    const WIDTHT = data[1].width
    const HEIGHT = data[2].height
    const DIAT = data[3].radius
    const SEAZON = data[4].season
    const BRAND = data[5].brands
    const DIAMETR = data[6].diametr
    const WIDTH = data[7].width
    const PCD = data[8].PCD
    const DIA = data[9].DIA
    const ET = data[10].ET
    this.productBrands = BRANDT
    this.productWidth = WIDTHT
    this.productHeight = HEIGHT
    this.productDia = DIAT
    this.productSeazon = SEAZON
    this.wheelsBrand = BRAND
    this.wheelsDiametr = DIAMETR
    this.wheelsWidth = WIDTH
    this.wheelsPCD = PCD
    this.wheelsDia = DIA
    this.wheelsET = ET
  }, err => {
    console.log(err);
  })
}

searchProduct(){
  if ( this.formFilter.value.width != '' ){
    this.filterParameters = 'width.param=' + this.formFilter.value.width.param
  }
  else{
    this.filterParameters
  }
  if( this.formFilter.value.height != ''){
    this.filterParameters += '&height.param=' + this.formFilter.value.height.param
  }
  else{
    this.filterParameters
  }
  if( this.formFilter.value.dia != ''){
    this.filterParameters += '&dia.param=' + this.formFilter.value.dia.param
  }
  else{
    this.filterParameters
  }
  if( this.formFilter.value.season != ''){
    this.filterParameters += 'season.param=' + this.formFilter.value.season.param
  }
  else{
    this.filterParameters
  }
  this.productService.getByCategory(this.categoryTyres,this.filterParameters).subscribe( data => {
    console.log(data);
    
    this.productService.getFilterProduct.next(data)
    this.productService.queryParams.next(this.formFilter.value)
  })
  this.router.navigate(['tyres'], {queryParams:{param: this.filterParameters}})
}

navigateTo(category: string):void{
  this.productService.getByCategory(category).subscribe(data => {
    console.log(data);
    this.productService.getFilterProduct.next(data)
  })
  this.router.navigate([`${category}`])
}

searchProductBySeason(seazon:string): void{
  this.filterParameters = this.filterParameters += 'season.param=' + seazon
  this.productService.getByCategory(this.categoryTyres,this.filterParameters).subscribe( data => {
    console.log(data);
    this.productService.getFilterProduct.next(data)
    this.productService.queryParams.next(this.formFilter.value)
  })
  this.router.navigate(['tyres'], {queryParams:{param: this.filterParameters}})
}

}
