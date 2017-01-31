import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { ApiService } from "./api.service";
import { AppState } from '../app.state';
import { Timer } from "../models/timer";


@Injectable()
export class TimersService {
  private canUpdate: boolean = true;

  constructor(private apiService: ApiService, private ngRedux: NgRedux<AppState>) { }

  createTimer(timer: Timer) {
    this.apiService.createTimer(timer).subscribe(
      resp => {
        var timers: Timer[] = resp.data.map(t => { return new Timer(t) });
        this.ngRedux.dispatch({type: 'SET_TIMERS', timers: timers});
      },
      err  => { this.setError(err) }
    );
  }

  updateTimer(timer: Timer) {
    this.apiService.updateTimer(timer).subscribe(
      resp => {
        this.ngRedux.dispatch({type: 'UPDATE_TIMER', timer: new Timer(resp.data)});
      },
      err  => { this.setError(err) }
    );
  }

  stopTimer(timer: Timer) {
    this.apiService.updateTimer(timer, true).subscribe(
      resp => {
        this.ngRedux.dispatch({type: 'UPDATE_TIMER', timer: new Timer(resp.data)});
      },
      err  => { this.setError(err) }
    );
  }

  deleteTimer(timer: Timer) {
    this.apiService.deleteTimer(timer).subscribe(
      resp => {
        if (resp.response_status.status == "200") {
          console.log("start time delete");
          this.ngRedux.dispatch({type: 'DELETE_TIMER', timer: timer});
        } else {
          // TODO: show error popup
          console.log("ERROR", resp)
        }
      },
      err  => { this.setError(err) }
    );
  }

  updateTimers(start: string = null, end: string = null) {
    if (!this.canUpdate || !this.apiService.getAuthHeaders()) { return }
    this.apiService.getTimers(start, end).subscribe(
      resp => {
        let timers: Timer[];
        if (resp.data) {
          timers = resp.data.map(t => { return new Timer(t) });
        } else {
          timers = [];
        }
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
