import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Journal,JournalModel } from '../modules/Journal';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private url="http://localhost:5000/api/journals";
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}), 
  };
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAll():Observable <Journal[]>{
    return this.http.get<Journal[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Journal[]>('getAll',[]))
    );
  }
  getJournalsAvaible():Observable <Journal[]>{
    return this.http.get<Journal[]>(`${this.url}/avaible`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Journal[]>('getJournalsAvaible',[]))
    );
  }
  getJournalsNotAvaible():Observable <Journal[]>{
    return this.http.get<Journal[]>(`${this.url}/not_avaible`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Journal[]>('getAll',[]))
    );
  }

  getJournal(id:Number):Observable <Journal[]>{
    return this.http.get<Journal[]>(`${this.url}/journal/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Journal[]>('getJournal',[]))
    );
  }
  addJournal(formData:Partial<JournalModel>):Observable<JournalModel>{
    return this.http.post<JournalModel>(`${this.url}/add_journal`,{titulo:formData.titulo,titular:formData.titular,cantidad:formData.cantidad,link_pdf_ref:formData.link_pdf_ref,num_volumen:formData.num_volumen,num_revista:formData.num_revista,fecha_publicacion:formData.fecha_publicacion},
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<JournalModel>('addJournal'))
    );
  }
  updateJournal(id:number,formData:Partial<JournalModel>):Observable <JournalModel>{
    return this.http.put<JournalModel>(`${this.url}/update_journal/${id}`,{titulo:formData.titulo,titular:formData.titular,cantidad:formData.cantidad,disponibles:formData.disponibles,link_pdf_ref:formData.link_pdf_ref,num_volumen:formData.num_volumen,num_revista:formData.num_revista,fecha_publicacion:formData.fecha_publicacion},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<JournalModel>('updateournal'))
    );
  }
  
  deleteJournal(id:Number):Observable<{}>{
    return this.http.delete<Journal>(`${this.url}/remove_journal/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Journal>("deleteJournal"))
    );
  }
}
