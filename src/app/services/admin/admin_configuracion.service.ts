import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class admin_ConfiguracionService {

  service:string = 'administrador/configuracion';


  constructor(private http:HttpClient) { }

  ActualizarReporteDeConceptos(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.service}/ReporteDeConceptos`,request);
  }

  
}