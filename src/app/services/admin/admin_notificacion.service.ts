import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class admin_NotificacionService {

  service:string = 'administrador/notificacion';

  constructor(private http:HttpClient) { }

  ConsultaNotificaciones(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.service}/ConsultaNotificaciones`,request);
  }
  CalcularNotificaciones(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.service}/CalcularNotificaciones`,request);
  }
  EnviarNotificaciones(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.service}/EnviarNotificaciones`,request);
  }
}