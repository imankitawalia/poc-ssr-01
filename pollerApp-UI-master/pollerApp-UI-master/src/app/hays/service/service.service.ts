import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  postRequest(hostname: string, port: string, endpoint: string, jsonBody: string)/*: Observable<any>*/ {
    const url = hostname + port + endpoint;
    console.log('Calling API : ', url);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return this.http.post<any>(url, jsonBody, { headers: headers});
  }
}
