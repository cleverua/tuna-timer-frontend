import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";
import * as moment from 'moment';

import { NgRedux } from "ng2-redux";
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
  private currentDay; today: moment.Moment;
  private monthsArray: string[] = moment.monthsShort();
  private arrayDaysInMonth: moment.Moment[][];
  private arrayForTilesOfMonth: moment.Moment[][];
  private subscription: Subscription;
  private viewToggle: string = 'day';
  private timers: Timer[];

  @Input() currentUser: User;
  @Input() projects: any;

  constructor(private ngRedux: NgRedux<AppState>, private ds: DatesService) {}

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

  changeDate(date: moment.Moment) {
    this.ngRedux.dispatch({type: 'SET_DATE', date: date.format('DD-MM-YY')});
    this.changeView('day')
  }

  changeMonth(input: number) {
    this.ngRedux.dispatch({type: 'SET_MONTH', month: input});
    this.changeView('month')
  }

  changeYear(offset: number) {
    let year: number = this.currentDay.year() + offset;
    this.ngRedux.dispatch({type: 'SET_YEAR', year: year});
  }

  showTimers(input: moment.Moment[]): boolean {
    for (let i = 0; i < input.length; i++) {
      if (input[i].format('DD-MM') == this.currentDay.format('DD-MM')) {
        return true;
      }
    }
    return false;
  }

  changeView(input: string) {
    this.viewToggle = input;
  }

  futureMonth(i: number): boolean {
    return i > this.today.month() && this.currentDay.year() == this.today.year()
  }

  showTodayButton(): boolean {
    return this.currentDay.format('MM') != this.today.format('MM')
      || this.currentDay.format('YYYY') != this.today.format('YYYY')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
