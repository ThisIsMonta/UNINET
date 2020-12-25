import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "/api";
  header:HttpHeaders;
  constructor(private httpClient: HttpClient) { 
    this.header = new HttpHeaders({"Authorization":`Bearer ${localStorage.getItem("token")}`})
  }

  sendGetRequest(uri:string){
    return this.httpClient.get(this.apiUrl+uri,{headers:this.header});
  }

  sendPutRequest(uri:string,data: Object){
    return this.httpClient.put(this.apiUrl+uri,data,{headers:this.header});
  }

  sendPostRequest(uri:string,data: Object): Observable<Object> {
    return this.httpClient.post(this.apiUrl+uri, data,{headers:this.header} );
  }

  sendDeleteRequest(uri:string){
    return this.httpClient.delete(this.apiUrl+uri,{headers:this.header} );
  }

  
}
