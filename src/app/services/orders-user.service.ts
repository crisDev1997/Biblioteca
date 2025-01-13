import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { OrderUser,OrderUserModel } from '../modules/Order_User';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class OrdersUserService {
  private url="http://localhost:5000/api/orders-user"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}), 
  };
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAllOrdersFromUsers():Observable <OrderUser[]>{
    return this.http.get<OrderUser[]>(`${this.url}/all-users-orders`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<OrderUser[]>('getAllMyOrders',[]))
    );
  }
  getAllMyOrders(id:Number):Observable <OrderUser[]>{
    return this.http.get<OrderUser[]>(`${this.url}/all-orders/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<OrderUser[]>('getAllMyOrders',[]))
    );
  }
  sendOrder(formData:Partial<OrderUserModel>):Observable<OrderUserModel>{
    return this.http.post<OrderUserModel>(`${this.url}/add-order`,{id_usuario:formData.id_usuario,nombre_libro:formData.nombre_libro,cantidad_pedida:formData.cantidad_pedida,fecha_pedido:formData.fecha_pedido},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<OrderUserModel>('sendOrder'))
    );
  }
  confirmOrder(id:Number):Observable<OrderUserModel>{
    return this.http.put<OrderUserModel>(`${this.url}/confirm-user-order/${id}`,
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<OrderUserModel>('sendOrder'))
    );
  }
  verifyConfirm(id:Number):Observable<OrderUserModel[]>{
    return this.http.get<OrderUserModel[]>(`${this.url}/verify-order/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<OrderUserModel[]>('getAllMyOrders',[]))
    );
  }
  deleteOrder(id:Number):Observable<{}>{
    return this.http.delete<OrderUserModel>(`${this.url}/delete-order/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<OrderUserModel>("deleteLoan"))
    );
  }

}
