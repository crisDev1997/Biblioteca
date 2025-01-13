import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { BookModel,BookSection } from '../modules/Book';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url="http://localhost:5000/api/books"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}),
    
  };


  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAllBooks():Observable <BookSection[]>{
    return this.http.get<BookSection[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<BookSection[]>('getAllBooks',[]))
    );
  }
  getBook(id:Number):Observable <BookModel[]>{
    return this.http.get<BookModel[]>(`${this.url}/book/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<BookModel[]>('getBook',[]))
    );
  }
  getBookAvaibles():Observable <BookSection[]>{
    return this.http.get<BookSection[]>(`${this.url}/avaible`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<BookSection[]>('getBookAvaibles',[]))
    );
  }
  getBookNotAvaible():Observable <BookSection[]>{
    return this.http.get<BookSection[]>(`${this.url}/not_avaible`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<BookSection[]>('getBookAvaibles',[]))
    );
  }
  
  addBook(formData:Partial<BookModel>):Observable<BookModel>{
    return this.http.post<BookModel>(`${this.url}/add_book`,{titulo:formData.titulo,autor:formData.autor,genero:formData.genero,id_seccion:formData.id_seccion,cantidad:formData.cantidad,disponibles:formData.disponibles,link_pdf_ref:formData.link_pdf_ref},
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<BookModel>('addBook'))
    );
  }
  addMoreBooks(idAndQuantity:Object):Observable<BookModel>{
    return this.http.put<BookModel>(`${this.url}/add_more/${idAndQuantity}`,
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<BookModel>('addMoreBooks'))
    );
  }
  updateBook(id:Number,formData:Partial<BookModel>):Observable <BookModel>{
    return this.http.put<BookModel>(`${this.url}/update_book/${id}`,{titulo:formData.titulo,autor:formData.autor,genero:formData.genero,id_seccion:formData.id_seccion,cantidad:formData.cantidad,disponibles:formData.disponibles,link_pdf_ref:formData.link_pdf_ref},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<BookModel>('updateBook'))
    );
  }
  deleteBook(id:Number):Observable<{}>{
    return this.http.delete<BookModel>(`${this.url}/delete_book/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<BookModel>("deleteBook"))
    );
  }
}
