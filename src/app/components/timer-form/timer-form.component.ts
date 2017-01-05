import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgRedux } from "ng2-redux";
import { AppState } from "../../app.state";
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Timer } from "../../models/timer";
import { ApiService } from "../../services/api.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-timer-form',
  templateUrl: './timer-form.component.html'
})
export class TimerFormComponent implements OnInit, OnDestroy {
  @Input() timer: Timer;
  @Input() projects: any;
  @Input() currentUser: User;
  private subscription: Subscription;
  private fetchPeriod: number = 10000;

  constructor(private ngRedux: NgRedux<AppState>, private apiService: ApiService) { }

  ngOnInit() {
    if (!this.timer.finished_at) {
      let timer = TimerObservable.create(this.fetchPeriod, this.fetchPeriod);
      this.subscription = timer.subscribe(() => {
        if (!document.hidden) {
          this.updateTimers();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription)  this.subscription.unsubscribe();
  }

  private updateTimers() {
    this.apiService.getTasks(this.currentUser.jwt).subscribe(
      resp => {
        let timers: Timer[] = resp.data.map(t => { return new Timer(t) });
        this.ngRedux.dispatch({type: 'SET_TIMERS', timers: timers});
      },
      err  => {
        this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: err});
    });
  }

  startStopClickHandler() {
    if (this.timer.finished_at) {
      this.apiService.createTimer(this.currentUser.jwt, this.timer).subscribe(
        resp => {
          var timers: Timer[] = resp.data.map(t => { return new Timer(t) });
          this.ngRedux.dispatch({type: 'SET_TIMERS', timers: timers});
        },
        err  => {
          this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: err});
        }
      );
    } else {
      this.apiService.updateTimer(this.currentUser.jwt, this.timer, true).subscribe(
        resp => {
          this.ngRedux.dispatch({type: 'UPDATE_TIMER', timer: new Timer(resp.data)});
        },
        err  => {
          this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: err});
        });
    }
  }
}
