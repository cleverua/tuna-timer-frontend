import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { AppError } from "../models/app-error";

@Injectable()
export class ApiService {
  private static authUrl = 'http://localhost:8080/api/v1/frontend/session';
  private static timersUrl = 'http://localhost:8080/api/v1/frontend/timers';

  constructor(private http: Http) { }

  getTasks(jwt: string, startDate: string = "", endDate: string = ""): Observable<any> {
    let headers: Headers = new Headers({'Authorization': 'Bearer ' + jwt});
    let params: URLSearchParams = new URLSearchParams();

    if (startDate == "" || endDate == "") {
      let date = new Date();
      startDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
      endDate = startDate;
    }

    params.set("startDate", startDate);
    params.set("endDate", endDate);

    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(ApiService.timersUrl, options)
      .map(s => {return s.json().data})
      .catch(this.handleError);
  }

  getToken(pid: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(ApiService.authUrl, {pid: pid}, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(err: any) {
    if(err.status === 401) {
      let error = new AppError(err.status, err.statusText);
      return Observable.throw(error);
    }

    let errMsg = (err.message) ? err.message : err.status ? `${err.status} - ${err.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
