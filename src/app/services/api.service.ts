import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:3333';

  constructor(private http: HttpClient) {
   }

  getHeaders(token?:String): HttpHeaders{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

        
    if(token){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+token
      });
    }
    return headers
  }
  logout(token:String){
    const headers = this.getHeaders(token)
    return this.http.post<any>(`${this.apiUrl}/logout`,{}, { headers });
  }

  post(data: any,ruta: String,token?:String): Observable<any> {
    const headers = this.getHeaders(token)
    return this.http.post<any>(`${this.apiUrl}/${ruta}`, data, { headers });
  }
  get(ruta: String,token?:String): Observable<any> {
    const headers = this.getHeaders(token)
    return this.http.get<any>(`${this.apiUrl}/${ruta}`, { headers });
  }
}
