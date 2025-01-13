import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Loan,LoanUser,LoanExtended } from '../modules/Loan';

import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private url="http://localhost:5000/api/devolutions"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}), 
  };


  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAll():Observable <LoanUser[]>{
    return this.http.get<LoanUser[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<LoanUser[]>('getAll',[]))
    );
  }
  getAllPending():Observable <LoanUser[]>{
    return this.http.get<LoanUser[]>(`${this.url}/pending`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<LoanUser[]>('getAllPending',[]))
    );
  }
  getLoan(id:Number):Observable <LoanUser[]>{
    return this.http.get<LoanUser[]>(`${this.url}/devolution/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<LoanUser[]>('getLoan',[]))
    );
  }

  getAllReturned():Observable <LoanUser[]>{
    return this.http.get<LoanUser[]>(`${this.url}/returned`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<LoanUser[]>('getAllReturned',[]))
    );
  }
  
  getAllExpired():Observable <LoanUser[]>{
    return this.http.get<LoanUser[]>(`${this.url}/expired`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<LoanUser[]>('getAllExpired',[]))
    );
  }
  getAllNotReturn():Observable <LoanUser[]>{
    return this.http.get<LoanUser[]>(`${this.url}/pending/not_returned`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<LoanUser[]>('getAllNotReturn',[]))
    );
  }
  
  getAllExtended():Observable <LoanExtended[]>{
    return this.http.get<LoanExtended[]>(`${this.url}/extended`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<LoanExtended[]>('getAllExtended'))
    );
  }
  addLoan(formData:Partial<Loan>):Observable<Loan>{
    return this.http.post<Loan>(`${this.url}/create_devolution`,{id_usuario:formData.id_usuario,id_libro:formData.id_libro,fecha_prestamo_persona:formData.fecha_prestamo_persona,fecha_vencimiento_entrega:formData.fecha_vencimiento_entrega},
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<Loan>('addLoan'))
    );
  }
  updateLoan(id:Number,formData:Partial<Loan>):Observable <Loan>{
    return this.http.put<Loan>(`${this.url}/update_devolution/${id}`,{id_usuario:formData.id_usuario,id_libro:formData.id_libro,fecha_prestamo_persona:formData.fecha_prestamo_persona,fecha_vencimiento_entrega:formData.fecha_vencimiento_entrega,status_devolucion:formData.status_devolucion},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Loan>('updateLoan'))
    );
  }
  updateStateLoan(idAndState:Object):Observable <Loan>{
    let id_state=JSON.stringify(idAndState)
    return this.http.put<Loan>(`${this.url}/update_state_devolution/${id_state}`,
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Loan>('updateStateLoan'))
    );
  }

  deleteLoan(id:Number):Observable<{}>{
    return this.http.delete<Loan>(`${this.url}/delete_devolution/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Loan>("deleteLoan"))
    );
  }
}
