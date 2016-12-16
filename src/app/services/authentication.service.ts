import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { AppError } from "../models/app-error";

@Injectable()
export class AuthenticationService {
  private static authUrl = 'http://localhost:8080/api/v1/frontend/session';
  private static validationUrl = 'http://localhost:8080/api/v1/frontend/auth/validate';

  constructor(private http: Http) { }

  getToken(pid: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(AuthenticationService.authUrl, {pid: pid}, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  validateToken(jwt: string): Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + jwt});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(AuthenticationService.validationUrl, options).map(s => {return s.status}).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(err: any) {
    if(err.status === 401 || err.status === 404) {
      let error = new AppError(err.status, err.statusText)
      return Observable.throw(error);
    }

    let errMsg = (err.message) ? err.message : err.status ? `${err.status} - ${err.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
