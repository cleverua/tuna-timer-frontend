import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { NgRedux } from "ng2-redux";
import * as moment from 'moment';

import { AppState } from "../../app.state";
import { DatesService } from "../../services/dates.service";
import { Timer } from "../../models/timer";
import { User } from "../../models/user";
import { TimersService } from "../../services/timers.service";
import { ApiService } from "../../services/api.service";

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
  protected monthStatistics: any[];
  private timers: Timer[];

  private currentUser: User;
  @Input() projects: any;

  constructor(public ngRedux: NgRedux<AppState>,
              public ds: DatesService,
              private timersService: TimersService,
              protected apiService: ApiService) {}

  ngOnInit() {
    this.ngRedux.dispatch({type: 'SET_CURRENT_DAY'});
    this.today = moment();
    this.subscription = this.ngRedux.select('currentDate').subscribe((currentDay: moment.Moment) => {
      if (this.currentDay && this.currentDay.format('MM-YY') != currentDay.format('MM-YY')) {

        console.log(this.currentDay.format('MM-YY'))
        console.log(currentDay.format('MM-YY'))
        this.getStatisticsData(currentDay);
      }
      this.currentDay = currentDay;
      this.arrayDaysInMonth = this.ds.getMonthDays(this.currentDay.format('YYYY-MM'));
      this.arrayForTilesOfMonth = this.ds.getTilesForCalendar(this.arrayDaysInMonth);
      this.timersService.updateTimers(this.currentDay.format('YYYY-MM-DD'), this.currentDay.format('YYYY-MM-DD'));
    });
    //TODO: move all subscription into Subscription array
    this.ngRedux.select('timers').subscribe((timers: Timer[]) => {
      this.timers = timers;
    });
    this.ngRedux.select('currentUser').subscribe((user: User) => {
      this.currentUser = user;
    });

    //TODO: Subscribe on statistics data
    this.getStatisticsData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  protected changeView(input: string) {
    this.viewToggle = input;
  }

  futureMonth(i: number): boolean {
    return i > this.today.month() && this.currentDay.year() == this.today.year()
  }

  showTodayButton(): boolean {
    return this.currentDay.format('MM') != this.today.format('MM')
      || this.currentDay.format('YYYY') != this.today.format('YYYY')
  }

  getStatisticsData(currentDay: moment.Moment = null) {
    if (this.apiService.getAuthHeaders()) {
      let date = currentDay || this.currentDay;
      this.apiService.getMonthStatistics(date.utc().format('YYYY-M') + "-1").subscribe(
        resp => {
          // TODO Place it to the store!!!
          this.monthStatistics = resp.data || [];
        },
        err  => {
          this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: err});
        }
      );
    }
  }
}
