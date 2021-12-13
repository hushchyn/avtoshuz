import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITyresResponse } from '../../interfaces/tyres.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  getFilterProduct: Subject<any> = new Subject<any>()
  queryParams: Subject<any> = new Subject<any>()

  private url = environment.BACKEND_URL
  private api = { product : `${this.url}/products`}

  constructor(private http: HttpClient) { }

//  getAll(): Observable<ITyresResponse[]>{
//    return this.http.get<ITyresResponse[]>(`${this.api.product}/?width.param=205 мм`)
//  }

//  getByFilter(parameters: string): Observable<ITyresResponse[]>{
//    return this.http.get<ITyresResponse[]>(`${this.api.product}/?width.param=205 мм`)
//  }

// getByCategory(category: string, parameters?:string): Observable<any[]>{
//   return this.http.get<any[]>(`${this.api.product}?category.name=${category}&_page=1&_limit=2${parameters}`)
// }

getAll(): Observable<ITyresResponse[]>{
  return this.http.get<ITyresResponse[]>(`${this.api.product}`)
}

//  getByCategory(category: string, parameters?:string): Observable<any[]>{
//   return this.http.get<any[]>(`${this.api.product}?category.name=${category}&${parameters}`)
// }

// _page=${page}&_limit=5

getByCategory(category: string, parameters?:string, page?:string): Observable<any[]>{
  return this.http.get<any[]>(`${this.api.product}?category.name=${category}&${parameters}&_page=${page}&_limit=5`)
}

 getOne(id:number): Observable<ITyresResponse>{
   return this.http.get<ITyresResponse>(`${this.api.product}/${id}`)
 }

 create(product: ITyresResponse): Observable<void>{
  return this.http.post<void>(this.api.product, product)
 }

 update(product: any, id: number): Observable<void>{
   return this.http.patch<void>(`${this.api.product}/${id}`, product)
 }

 delete(id:number): Observable<void>{
   return this.http.delete<void>(`${this.api.product}/${id}`)
 }

 


}
