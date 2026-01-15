import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class admin_ConceptosService {

  service:string = 'administrador/concepto';


  constructor(private http:HttpClient) { }

  Crear(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.service}`,request);
  }

  GetAll():Observable<any>{
    let params = new HttpParams();
console.log(`${environment.apiUrl}/${this.service}`);
    return this.http.get<any>(`${environment.apiUrl}/${this.service}`);
  }

  GetById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/${this.service}/${id}`);
  }

  Desactivar(id:any):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/${this.service}/${id}/desactivar`,{});
  }

  Reactivar(id:any):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/${this.service}/${id}/activar`,{});
  }
  Update(id:string, request:any):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/${this.service}/${id}`,request);
  }

}