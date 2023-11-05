import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from '../environments/environment';
import {Meeting} from "../app/models/meeting";

@Injectable({
  providedIn: 'root'
})
export class MettingService {

  _urlApi = environment.apiBaseUrl;
  _url_meeting = this._urlApi+'api/meetings';


  constructor(
    public http: HttpClient,
  ) { }

  getOperations(query = ''): Observable<any[]>{
    return this.http.get<any[]>(`${this._url_meeting}/get_all_meetings?${query}`);
  }

  getOperation(id : any): Observable<any>{
    return this.http.get(`${this._url_meeting }/${id}`);
  }

  postOperation(data: any): Observable<any>{
    return this.http.post<any>(`${this._url_meeting}`, data);
  }

  put(id:number, data: any): Observable<any>{
    return this.http.put<any>(`${this._url_meeting}/${id}`, data);
  }

  delete(id:number): Observable<any>{
    console.log(id)
    return this.http.delete<any>(`${this._url_meeting}/${id}`);
  }
}
