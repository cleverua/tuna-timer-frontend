import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import * as moment from 'moment';

import { NgRedux } from "ng2-redux";
import { AppState } from "../../app.state";
import { DatesService } from "../../services/dates.service";
// import { Timer } from "../../models/timer";
// import { User } from "../../models/user";

@Component({
  selector: 'app-week-report',
  templateUrl: 'week-report.component.html',
  styleUrls: ['week-report.component.css']
})
export class WeekReportComponent implements OnInit, OnDestroy {
  private currentDay; today: moment.Moment;
  private monthsArray: string[] = moment.monthsShort();
  private arrayDaysInMonth: moment.Moment[][];
  private arrayForTilesOfMonth: moment.Moment[][];
  private subscription: Subscription;
  private viewToggle: string = 'week';
  // private timers: Timer[];

  // @Input() currentUser: User;
  // @Input() projects: any;

  constructor(private ngRedux: NgRedux<AppState>, private ds: DatesService) {}

  ngOnInit() {
    this.ngRedux.dispatch({type: 'SET_CURRENT_DAY'});
    this.today = moment();
    this.subscription = this.ngRedux.select('currentDate').subscribe((currentDay: moment.Moment) => {
      this.currentDay = currentDay;
      this.arrayDaysInMonth = this.ds.getMonthDays(this.currentDay.format('YYYY-MM'));
      this.arrayForTilesOfMonth = this.ds.getTilesForCalendar(this.arrayDaysInMonth);
    });
  }

  changeDate(input: string, state: string = 'week') {
    this.ngRedux.dispatch({type: 'SET_DATE', date: input});
    this.changeView(state);
  }

  changeMonth(input: number, state: string = 'month') {
    this.ngRedux.dispatch({type: 'SET_MONTH', month: input});
    this.changeView(state);
  }

  changeYear(input: number) {
    this.ngRedux.dispatch({type: 'SET_YEAR', year: input});
  }

  changeView(input: string) {
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

  showTimers(input: moment.Moment[]) {
    for (let i = 0; i < input.length; i++) {
      if (input[i].format('DD-MM') == this.currentDay.format('DD-MM')) {
        return true;
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
