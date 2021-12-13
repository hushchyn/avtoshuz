import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserRequest, IUserResponse } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser$ = new Subject<boolean>()

  private url = environment.BACKEND_URL
  private api = { users: `${this.url}/users` }

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getAll(): Observable<any>{
    return this.http.get(this.api.users)
  }

  create(user:IUserResponse): Observable<void>{
    return this.http.post<void>(this.api.users, user)
  }

  update(user: IUserResponse, id: number): Observable<void>{
    return this.http.patch<void>(`${this.api.users}/${id}`, user)
  }

  logOut():void{
    localStorage.removeItem('user')
    this.currentUser$.next(false)
    this.router.navigate([''])

  }

}
