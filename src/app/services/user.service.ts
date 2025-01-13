import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User ,UserData,BannedUser} from '../modules/User';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url="http://localhost:5000/api/users"
  
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}),
    
  };
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) {}
  
  getAll():Observable <User[]>{
    return this.http.get<User[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<User[]>('getAll',[]))
    );
  }
 
  
  getUser(ci:string):Observable <UserData[]>{
    return this.http.get<UserData[]>(`${this.url}/user/${ci}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<UserData[]>('getUser'))
    );
  }
  getAllowedUsers():Observable <User[]>{
    return this.http.get<User[]>(`${this.url}/allowed`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<User[]>('getAllowedUsers',[]))
    );
  }
  getBannedUsers():Observable <BannedUser[]>{
    return this.http.get<BannedUser[]>(`${this.url}/banned`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<BannedUser[]>('getBannedUsers',[]))
    );
  }
  updateUser(userCI:string,formData:any):Observable <UserData>{
    return this.http.put<UserData>(`${this.url}/update_user/${userCI}`,{ci:formData.ci,nombres:formData.nombres,apellidos:formData.apellidos,fec_nac:formData.fec_nac,num_telf:formData.num_telf,correo:formData.correo,observacion:formData.observacion,historial_prestamo:formData.historial_prestamo,correo1:formData.correo1},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<UserData>('updateUser'))
    );
  }

  createUser(formData:Partial<User>):Observable<User>{
      return this.http.post<User>(`${this.url}/add_user`,{ci:formData.ci,nombres:formData.nombres,apellidos:formData.apellidos,fec_nac:formData.fec_nac,num_telf:formData.num_telf,correo:formData.correo},
      this.httpOptions)
      .pipe(  
        catchError(this.errorHandlerService.handleError<User>('createUser'))
      );
  }
  
  deleteUser(userCI:string):Observable<{}>{
    return this.http.delete<User>(`${this.url}/delete_user/${userCI}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("deleteUser"))
    );
  }
}
