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

  changeDate(date: moment.Moment) {
    this.ngRedux.dispatch({type: 'SET_DATE', date: date.format('DD-MM-YY')});
    this.changeView('week');
  }

  changeMonth(input: number) {
    this.ngRedux.dispatch({type: 'SET_MONTH', month: input});
    this.changeView('month');
  }

  changeYear(offset: number) {
    let year: number = this.currentDay.year() + offset;
    this.ngRedux.dispatch({type: 'SET_YEAR', year: year});
  }

  changeView(input: string) {
    this.viewToggle = input;
  }

  futureMonth(i: number): boolean {
    return i > this.today.month() && this.currentDay.year() == this.today.year()
  }

  showTodayButton(): boolean {
    return this.currentDay.format('MM') != this.today.format('MM') ||
      this.currentDay.format('YYYY') != this.today.format('YYYY')
  }

  showTimers(input: moment.Moment[]): boolean {
    for (let i = 0; i < input.length; i++) {
      if (input[i].format('DD-MM') == this.currentDay.format('DD-MM')) {
        return true
      }
    }
    return false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
