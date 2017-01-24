import {Component, OnInit, Input} from '@angular/core';
import { Subscription } from "rxjs";
import * as moment from 'moment';

import { NgRedux } from "ng2-redux";
import { AppState } from "../../app.state";
import {DatesService} from "../../services/dates.service";
import {Timer} from "../../models/timer";
import {User} from "../../models/user";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  private currentDay; today: moment.Moment;
  private monthsArray: string[] = moment.monthsShort();
  private arrayDaysInMonth: moment.Moment[][];
  private arrayForTilesOfMonth: moment.Moment[][];
  private subscription: Subscription;
  private viewToggle: number = 1;

  @Input() timers: Timer[];
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

  changeDate(input: string) {
    this.ngRedux.dispatch({type: 'SET_DATE', date: input});
    this.changeView('day');
  }

  changeMonth(input: number) {
    this.ngRedux.dispatch({type: 'SET_MONTH', month: input});
    this.changeView('month');
  }

  changeYear(input: number) {
    this.ngRedux.dispatch({type: 'SET_YEAR', year: input});
  }

  showTimers(input: moment.Moment[]) {
    for (let i = 0; i < input.length; i++) {
      if (input[i].format('DD-MM') == this.currentDay.format('DD-MM')) {
        return true
      }
    }
  }

  changeView(input: string) {
    switch (input) {
      case 'month':
        return this.viewToggle = 3;
      case 'week':
        return this.viewToggle = 2;
      case 'day':
        return this.viewToggle = 1;
    }
  }

}
