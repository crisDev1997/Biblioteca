import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Purchase,PurchaseDetails,PurchaseAllDetails,PurchaseModel,PurchaseDetailsModel,PurchaseWithDetails } from '../modules/Purchase';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private url="http://localhost:5000/api/purchases"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}), 
  };

  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAllPurchases():Observable <Purchase[]>{
    return this.http.get<Purchase[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Purchase[]>('getAllPurchases',[]))
    );
  }
  getAllMyPurchases(id:Number):Observable <Purchase[]>{
    return this.http.get<Purchase[]>(`${this.url}/all/admin/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Purchase[]>('getAllMyPurchases',[]))
    );
  }
  getDetailsFromPurchase(id:Number):Observable <PurchaseDetails[]>{
    return this.http.get<PurchaseDetails[]>(`${this.url}/purchase/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<PurchaseDetails[]>('getDetailsFromPurchase',[]))
    );
  }
  addPurchase(formData:Partial <PurchaseWithDetails>):Observable <PurchaseWithDetails>{
    return this.http.post<PurchaseWithDetails>(`${this.url}/add_purchase`,{id_admin:formData.id_admin,descripcion:formData.descripcion,fecha_compra:formData.fecha_compra,id_libro:formData.id_libro,cantidad_compra:formData.cantidad_compra,precio_unitario:formData.precio_unitario},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<PurchaseWithDetails>('addPurchase'))
    );
  }
  deletePurchase(id:Number):Observable<{}>{
    return this.http.delete<PurchaseModel>(`${this.url}/delete_purchase/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<PurchaseModel>("deletePurchase"))
    );
  }
}
