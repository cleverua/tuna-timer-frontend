import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";
import { NgRedux } from "ng2-redux";
import * as moment from 'moment';

import { AppState } from "../../app.state";
import { DatesService } from "../../services/dates.service";
import { Timer } from "../../models/timer";
import { User } from "../../models/user";

@Component({
  selector: 'app-day-report',
  templateUrl: 'day-report.component.html',
  styleUrls: ['day-report.component.css']
})

export class DayReportComponent implements OnInit, OnDestroy {
  protected currentDay; today: moment.Moment;
  protected monthsArray: string[] = moment.monthsShort();
  protected arrayDaysInMonth: moment.Moment[][];
  protected arrayForTilesOfMonth: moment.Moment[][];
  protected subscription: Subscription;
  protected viewToggle: string = 'day';
  private timers: Timer[];

  private currentUser: User;
  @Input() projects: any;

  constructor(public ngRedux: NgRedux<AppState>, public ds: DatesService) {}

  ngOnInit() {
    this.ngRedux.dispatch({type: 'SET_CURRENT_DAY'});
    this.today = moment();
    this.subscription = this.ngRedux.select('currentDate').subscribe((currentDay: moment.Moment) => {
      this.currentDay = currentDay;
      this.arrayDaysInMonth = this.ds.getMonthDays(this.currentDay.format('YYYY-MM'));
      this.arrayForTilesOfMonth = this.ds.getTilesForCalendar(this.arrayDaysInMonth);
      this.ngRedux.select('timers').subscribe((timers: Timer[]) => {
        this.timers = timers;
      });
      this.ngRedux.select('currentUser').subscribe((user: User) => {
        this.currentUser = user;
      });
    });
  }

  changeDate(input: string, state: string = 'day') {
    this.ngRedux.dispatch({type: 'SET_DATE', date: input});
    this.changeView(state)
  }

  changeMonth(input: number, state: string = 'month') {
    this.ngRedux.dispatch({type: 'SET_MONTH', month: input});
    this.changeView(state)
  }

  changeYear(input: number) {
    this.ngRedux.dispatch({type: 'SET_YEAR', year: input});
  }

  showTimers(input: moment.Moment[]) {
    for (let i = 0; i < input.length; i++) {
      if (input[i].format('DD-MM') == this.currentDay.format('DD-MM')) {
        return true;
      }
    }
  }

  protected changeView(input: string) {
    this.viewToggle = input;
  }

  futureMonth(i: number) {
    if (i > this.today.month() && this.currentDay.year() == this.today.year()) {
      return true;
    }
  }

  showTodayButton() {
    if (this.currentDay.format('MM') != this.today.format('MM') ||
      this.currentDay.format('YYYY') != this.today.format('YYYY')) {
      return true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
