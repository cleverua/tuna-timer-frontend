import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { ApiService } from "./api.service";
import { AppState } from '../app.state';
import { Timer } from "../models/timer";


@Injectable()
export class TimersService {
  private canUpdate: boolean = true;

  constructor(private apiService: ApiService, private ngRedux: NgRedux<AppState>) { }

  createTimer(timer: Timer, jwt: string) {
    this.apiService.createTimer(jwt, timer).subscribe(
      resp => {
        var timers: Timer[] = resp.data.map(t => { return new Timer(t) });
        this.ngRedux.dispatch({type: 'SET_TIMERS', timers: timers});
      },
      err  => { this.setError(err) }
    );
  }

  updateTimer(timer: Timer, jwt: string) {
    this.apiService.updateTimer(jwt, timer).subscribe(
      resp => {
        this.ngRedux.dispatch({type: 'UPDATE_TIMER', timer: new Timer(resp.data)});
      },
      err  => { this.setError(err) }
    );
  }

  stopTimer(timer: Timer, jwt: string) {
    this.apiService.updateTimer(jwt, timer, true).subscribe(
      resp => {
        this.ngRedux.dispatch({type: 'UPDATE_TIMER', timer: new Timer(resp.data)});
      },
      err  => { this.setError(err) }
    );
  }

  updateTimers(jwt: string) {
    if (!this.canUpdate) { return }

    this.apiService.getTasks(jwt).subscribe(
      resp => {
        let timers: Timer[] = resp.data.map(t => { return new Timer(t) });
        this.ngRedux.dispatch({type: 'SET_TIMERS', timers: timers});
      },
      err  => { this.setError(err) }
    );
  }

  disableUpdate() {
    this.canUpdate = false;
  };

  allowUpdate() {
    this.canUpdate = true;
  };

  private setError(err: Error) {
    this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: err});
  }
}
