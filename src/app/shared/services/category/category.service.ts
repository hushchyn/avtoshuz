import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryResponse } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL
  private api = { category: `${this.url}/category`}

  constructor( private http:HttpClient ) { }

  getAll(): Observable<ICategoryResponse[]>{
    return this.http.get<ICategoryResponse[]>(this.api.category)
  }

  getOne(id:number): Observable<ICategoryResponse>{
    return this.http.get<ICategoryResponse>(`${this.api.category}/${id}`)
  }

  create(category: ICategoryResponse): Observable<void>{
    return this.http.post<void>(this.api.category,category)
  }

  update(category: ICategoryResponse, id:number): Observable<void>{
    return this.http.patch<void>(`${this.api.category}/${id}`, category)
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.api.category}/${id}`)
  }

}
