import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Sanction,SanctionUser } from '../modules/Sanction';

import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class SanctionService {
  private url="http://localhost:5000/api/sanctions"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}),
    
  };
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAll():Observable <SanctionUser[]>{
    return this.http.get<SanctionUser[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SanctionUser[]>('getAll',[]))
    );
  }
  getAllReturn():Observable <SanctionUser[]>{
    return this.http.get<SanctionUser[]>(`${this.url}/users/returned`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SanctionUser[]>('getAll',[]))
    );
  }
  getAllNotReturn():Observable <SanctionUser[]>{
    return this.http.get<SanctionUser[]>(`${this.url}/users/not_return`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SanctionUser[]>('getAll',[]))
    );
  }
  getSanction(ci:string):Observable <SanctionUser[]>{
    return this.http.get<SanctionUser[]>(`${this.url}/sanction/${ci}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SanctionUser[]>('getSanction'))
    );
  }
  getSancionById(id:number):Observable <SanctionUser[]>{
    return this.http.get<SanctionUser[]>(`${this.url}/sanction_id/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SanctionUser[]>('getSanctionById'))
    );
  }
  addUserSanction(formData:Partial<Sanction>):Observable<Sanction>{
    return this.http.post<Sanction>(`${this.url}/add_sanction`,{id_usuario:formData.id_usuario,id_devolucion:formData.id_devolucion,razon_sancion:formData.razon_sancion,fecha_sancion:formData.fecha_sancion,fecha_fin_sancion:formData.fecha_fin_sancion},
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<Sanction>('addUserSanction'))
    );
  }
  updateSanction(id:number,formData:Partial<Sanction>):Observable <Sanction>{
    return this.http.put<Sanction>(`${this.url}/update_sanction/${id}`,{id_usuario:formData.id_usuario,id_devolucion:formData.id_devolucion,razon_sancion:formData.razon_sancion,fecha_sancion:formData.fecha_sancion,fecha_fin_sancion:formData.fecha_fin_sancion},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Sanction>('updateSanction'))
    );
  }
  deleteSanction(id:number):Observable<{}>{
    return this.http.delete<Sanction>(`${this.url}/delete_sanction/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Sanction>("deleteSanction"))
    );
  }
}
