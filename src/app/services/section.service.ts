import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Section,SectionBooks,SectionInsertUpdate } from '../modules/Section';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private url="http://localhost:5000/api/sections"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}), 
  };

  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAll():Observable <Section[]>{
    return this.http.get<Section[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Section[]>('getAll',[]))
    );
  }
  getBooksFromASectionNumber(num:Number):Observable <SectionBooks[]>{
    return this.http.get<SectionBooks[]>(`${this.url}/number/${num}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SectionBooks[]>('getBooksFromASectionNumber',[]))
    );
  }
  getSection(id:Number):Observable <Section[]>{
    return this.http.get<Section[]>(`${this.url}/section/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Section[]>('getSection',[]))
    );
  }
  getBooksFromSectionName(name:String):Observable <SectionBooks[]>{
    return this.http.get<SectionBooks[]>(`${this.url}/name/${name}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SectionBooks[]>('getBooksFromSectionName',[]))
    );
  }
  getBooksFromSectionId(id:Number):Observable <SectionBooks[]>{
    return this.http.get<SectionBooks[]>(`${this.url}/id/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<SectionBooks[]>('getBooksFromSectionName',[]))
    );
  }
 
  addSection(formData:Partial<SectionInsertUpdate>):Observable<SectionInsertUpdate>{
    return this.http.post<SectionInsertUpdate>(`${this.url}/add_section`,{nombre_seccion:formData.nombre_seccion,num_seccion:formData.num_seccion,tags:formData.tags},
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<SectionInsertUpdate>('addSection'))
    );
  }
  updateSection(id:number,formData:Partial<SectionInsertUpdate>):Observable <SectionInsertUpdate>{
    return this.http.put<SectionInsertUpdate>(`${this.url}/update_section/${id}`,{nombre_seccion:formData.nombre_seccion,num_seccion:formData.num_seccion,tags:formData.tags},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<SectionInsertUpdate>('updateLoan'))
    );
  }
  
  deleteSection(id:number):Observable<{}>{
    return this.http.delete<Section>(`${this.url}/remove/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Section>("deleteSection"))
    );
  }
}
