import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Extend , ExtensionUserLib} from '../modules/Extend';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class ExtendService {
  private url="http://localhost:5000/api/extensions"
  httpOptions:{headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json", responseType:'json'}),
    
  };
  constructor(private http:HttpClient, private errorHandlerService:ErrorHandlerService) { }
  getAllExtendDates():Observable <ExtensionUserLib[]>{
    return this.http.get<ExtensionUserLib[]>(`${this.url}/all_extensions`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<ExtensionUserLib[]>('getAll',[]))
    );
  }
 
  
  getExtendDate(id:number):Observable <ExtensionUserLib[]>{
    return this.http.get<ExtensionUserLib[]>(`${this.url}/extension/${id}`,{responseType:"json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<ExtensionUserLib[]>('getExtend'))
    );
  }
  updateExtendDate(id:number,formData:Partial<Extend>):Observable <Extend>{
    return this.http.put<Extend>(`${this.url}/update_extension/${id}`,{id_devolucion:formData.id_devolucion,fecha_entrega_anterior:formData.fecha_entrega_anterior,fecha_ampliacion:formData.fecha_ampliacion,fecha_limite_ampliacion:formData.fecha_limite_ampliacion},
    this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Extend>('updateExtend'))
    );
  }

  extendDate(formData:Partial<Extend>):Observable<Extend>{
      return this.http.post<Extend>(`${this.url}/add_extension`,{id_devolucion:formData.id_devolucion,fecha_entrega_anterior:formData.fecha_entrega_anterior,fecha_ampliacion:formData.fecha_ampliacion,fecha_limite_ampliacion:formData.fecha_limite_ampliacion},
      this.httpOptions)
      .pipe(  
        catchError(this.errorHandlerService.handleError<Extend>('extendDate'))
      );
  }
  
  deleteExtendDate(id:number):Observable<{}>{
    return this.http.delete<Extend>(`${this.url}/delete_extension/${id}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Extend>("deleteExtend"))
    );
  }
}
