import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { first,tap,catchError } from 'rxjs/operators';

import {Admin} from '../modules/Admin'
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url="http://localhost:5000/auth"

  isAdminLoggedIn$=new BehaviorSubject<boolean>(false);
  adminId!: Pick<Admin, "id_admin">
  
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json"})
    
  }
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService,private router:Router) {
  }
  signup(admin: Omit<Admin,"id_admin">):Observable <Admin>{
    return this.http.post<Admin>(`${this.url}/signup`,admin,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Admin>('signup'))
    )
  }
  
  
  signin(
    correo: Pick<Admin,"correo">,
    pass: Pick<Admin, "pass">
    ): Observable<{
    token:string; 
    adminId:Pick<Admin,"id_admin">;
    }> {
    return this.http
    .post(`${this.url}/login`,{correo, pass},this.httpOptions)
    .pipe(
      first(Object),
      tap((tokenObject:{token:string; adminId: Pick <Admin,"id_admin">})=>{ 
        this.adminId=tokenObject.adminId;
        localStorage.setItem("token",tokenObject.token);
        this.isAdminLoggedIn$.next(true);
        this.router.navigate(['books/books-list']);
      }),
      catchError(this.errorHandlerService.handleError<{
        token:string; 
        adminId:Pick <Admin, "id_admin" >
      }>('signin'))
    );
  }
}
