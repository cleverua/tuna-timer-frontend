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
  private url = 'http://localhost:8080/api/v1/frontend/';
  private resources = {
    auth: 'session',
    projects: 'projects',
    timers: 'timers',
    month_statistics: 'month_statistics'
  };

  private headers: Headers;

  constructor(private http: Http) { }

  getTimers(startDate: string = "", endDate: string = ""): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    let url = this.url + this.resources.timers;

    if (startDate == "" || endDate == "") {
      let date = new Date();
      startDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
      endDate = startDate;
    }

    params.set("startDate", startDate);
    params.set("endDate", endDate);

    let options = new RequestOptions({headers: this.headers, search: params});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  getProjects(): Observable<any> {
    let url = this.url + this.resources.projects;
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  getToken(pid: string): Observable<any> {
    let url = this.url + this.resources.auth;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, {pid: pid}, options).map(this.extractData).catch(this.handleError);
  }

  updateTimer(timer: Timer, stopAction: boolean = false) {
    let url = this.url + this.resources.timers + "/" + timer.id;

    let params: URLSearchParams = new URLSearchParams();
    if (stopAction) {
      params.set("stop_timer", "t");
    }

    let options = new RequestOptions({headers: this.headers, search: params});
    return this.http.put(url, timer, options).map(this.extractData).catch(this.handleError);
  }

  createTimer(timer: Timer) {
    let url = this.url + this.resources.timers;
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(url, timer, options).map(this.extractData).catch(this.handleError);
  }

  deleteTimer(timer: Timer) {
    let url = this.url + this.resources.timers + "/" + timer.id;
    let options = new RequestOptions({headers: this.headers});

    return this.http.delete(url, options).map(this.extractData).catch(this.handleError);
  }

  getMonthStatistics(date: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    let url = this.url + this.resources.month_statistics;
    params.set("date", date);

    let options = new RequestOptions({headers: this.headers, search: params});
    return this.http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  setAuthHeaders(jwt: string) {
    this.headers =  new Headers({
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    });
  }

  getAuthHeaders() {
    return this.headers;
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
