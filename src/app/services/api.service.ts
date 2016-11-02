import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Http, Response } from '@angular/http';

@Injectable()
export class ApiService {

  private static URL = 'https://query.yahooapis.com/v1/public/yql?' +
  'q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20' +
  '(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)' +
  '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

  constructor(private http: Http) { }

  fetchArticles(): Observable<any> {
    return this.http.get(ApiService.URL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message : err.status ? `${err.status} - ${err.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
