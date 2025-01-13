import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Reservation,ReservationModel } from '../modules/Reservation';

import { ErrorHandlerService } from './error-handler.service'
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url="http://localhost:5000/api/reservations"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}), 
  };
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAllReservations():Observable <Reservation[]>{
    return this.http.get<Reservation[]>(`${this.url}/reservation/all`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Reservation[]>('getAllReservations',[]))
    );
  }
  getAllReservationsFromAUser(id:Number):Observable <Reservation[]>{
    return this.http.get<Reservation[]>(`${this.url}/user/reservations/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Reservation[]>('getAllReservationsFromAUser',[]))
    );
  }
  addReservation(formData:Partial<ReservationModel>){
    return this.http.post<ReservationModel>(`${this.url}/add_reservation`,{id_usuario:formData.id_usuario,id_libro:formData.id_libro,fecha_reserva:formData.fecha_reserva,fecha_limite_reserva:formData.fecha_limite_reserva},
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<ReservationModel>('addReservation'))
    );
  }
  deleteReservation(id:Number){
    return this.http.delete<ReservationModel>(`${this.url}/delete_reservation/${id}`,
    this.httpOptions)
    .pipe(  
      catchError(this.errorHandlerService.handleError<ReservationModel>('deleteReservation'))
    );
  }
}
