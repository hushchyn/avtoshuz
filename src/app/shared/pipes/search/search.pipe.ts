import { Pipe, PipeTransform } from '@angular/core';
import { ITyresResponse } from '../../interfaces/tyres.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(brands: Array<any>, field: string): Array<any> {
    if (!field){
      return brands
    }
    if ( !brands ){
      return []
    }
    if ( brands.filter(brand =>brand.name.toLowerCase().includes(field.toLowerCase()))){
      return brands.filter(brand =>brand.name.toLowerCase().includes(field.toLowerCase()))
    }
    return []
  }
}
