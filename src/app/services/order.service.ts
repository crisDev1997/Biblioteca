import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Order,OrderModel } from '../modules/Order';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url="http://localhost:5000/api/orders"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}), 
  };
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }

  getAll():Observable <Order[]>{
    return this.http.get<Order[]>(`${this.url}/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Order[]>('getAll',[]))
    );
  }
  getOrder(id:Number):Observable <Order[]>{
    return this.http.get<Order[]>(`${this.url}/order/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Order[]>('getOrder',[]))
    );
  }
  getOrdersByAdmin(idAdmin:Number):Observable <Order[]>{
    return this.http.get<Order[]>(`${this.url}/admin/${idAdmin}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Order[]>('getOrdersByAdmin',[]))
    );
  }
  addOrder(formData:Partial<OrderModel>):Observable<OrderModel>{
    return this.http.post<OrderModel>(`${this.url}/add_order`,{id_admin:formData.id_admin,id_libro:formData.id_libro,cantidad_pedida:formData.cantidad_pedida,fecha_pedido:formData.fecha_pedido},
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<OrderModel>('addOrder'))
    );
  }
  updateOrder(id:Number,formData:Partial<OrderModel>):Observable <OrderModel>{
    return this.http.put<OrderModel>(`${this.url}/update_order/${id}`,{id_admin:formData.id_admin,id_libro:formData.id_libro,cantidad_pedida:formData.cantidad_pedida,fecha_pedido:formData.fecha_pedido},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<OrderModel>('updateOrder'))
    );
  }
  deleteOrder(id:Number):Observable<{}>{
    return this.http.delete<OrderModel>(`${this.url}/delete_order/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<OrderModel>("deleteOrder"))
    );
  }
}
