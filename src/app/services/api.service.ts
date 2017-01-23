import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { AppError } from "../models/app-error";
import {Timer} from "../models/timer";

@Injectable()
export class ApiService {
  //TODO move url(for develop and production mode) into project config
  private static authUrl = 'http://localhost:8080/api/v1/frontend/session';
  private static projectsUrl = 'http://localhost:8080/api/v1/frontend/projects';
  private static timersUrl = 'http://localhost:8080/api/v1/frontend/timers';

  private headers: Headers;

  constructor(private http: Http) { }

  getTimers(startDate: string = "", endDate: string = ""): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();

    if (startDate == "" || endDate == "") {
      let date = new Date();
      startDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
      endDate = startDate;
    }

    params.set("startDate", startDate);
    params.set("endDate", endDate);

    let options = new RequestOptions({headers: this.headers, search: params});
    return this.http.get(ApiService.timersUrl, options).map(this.extractData).catch(this.handleError);
  }

  getProjects(): Observable<any> {
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(ApiService.projectsUrl, options).map(this.extractData).catch(this.handleError);
  }

  getToken(pid: string): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(ApiService.authUrl, {pid: pid}, options).map(this.extractData).catch(this.handleError);
  }

  updateTimer(timer: Timer, stopAction: boolean = false) {
    let url = `${ApiService.timersUrl}/${timer.id}`;

    let params: URLSearchParams = new URLSearchParams();
    if (stopAction) {
      params.set("stop_timer", "t");
    }

    let options = new RequestOptions({headers: this.headers, search: params});
    return this.http.put(url, timer, options).map(this.extractData).catch(this.handleError);
  }

  createTimer(timer: Timer) {
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(ApiService.timersUrl, timer, options).map(this.extractData).catch(this.handleError);
  }

  deleteTimer(timer: Timer) {
    let url = `${ApiService.timersUrl}/${timer.id}`;
    let options = new RequestOptions({headers: this.headers});

    return this.http.delete(url, options).map(this.extractData).catch(this.handleError);
  }

  setAuthHeaders(jwt: string) {
    this.headers =  new Headers({
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    });
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

    let error = new AppError(404);
    return Observable.throw(error);
  }
}
