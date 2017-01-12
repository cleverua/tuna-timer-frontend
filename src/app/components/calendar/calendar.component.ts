import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {NgRedux} from "ng2-redux";
import {AppState} from "../../app.state";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private currentDay: moment.Moment;
  private monthArray: string[] = moment.monthsShort();
  arr : IMonth[];
  b: IMonth;
  arrWeeks:  IMonth[][];
  private arrDaysInMonth: any;
  private subscription: Subscription;

  constructor(private ngRedux: NgRedux<AppState>) {


  }

  ngOnInit() {
    // custom for tests '16-01-07', 'YY-MM-DD'    '16-1', 'YY-MM'

    this.subscription  = this.ngRedux.select('currentDay').subscribe((currentDay: moment.Moment) => this.currentDay = currentDay);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    // console.log(a);

    console.log(this.currentDay);
    if (this.currentDay) {
      this.arrWeeks = [];
      this.arr = [];
      this.arrDaysInMonth = [];
      this.arrDaysInMonth = this.getMonthDays(this.currentDay.format('YYYY-MM'));
    }
    // console.log(this.currentDay);
    // this.subscription = this.ngRedux.select('SET_YEAR')
    //   .subscribe();
  }

  getMonthDays(input: string) {
    let inputMoment = moment(input, 'YYYY-MM');
    let firstDay = inputMoment.date(1).isoWeekday();
    let daysInFirstWeek = 8 - firstDay;
    let daysInMonth = inputMoment.daysInMonth();
    let fullWeek = 0;

    /*Condition if month not start with Monday               */
    if (firstDay) {
      /*Create first not full week                             */
      for (let j = 1; j <= daysInFirstWeek; j++) {
        let dayOfMonth = inputMoment.date(j);
        this.b = {weekDay: dayOfMonth.format('dd'), day: dayOfMonth.date()};
        this.arr.push(this.b);
      }
      this.arrWeeks.push(this.arr);
      this.arr = [];
    }
    /* Other part of month with not full week in the end    */
    for (fullWeek; fullWeek < ( daysInMonth - daysInFirstWeek ) / 7; fullWeek++) {
      for (let j = 1; j <= 7; j++) {
        let dayOfMonth = inputMoment.date(j + daysInFirstWeek + fullWeek * 7);
        if (dayOfMonth.date() < daysInMonth ) {
          this.b = {weekDay: dayOfMonth.format('dd'), day: dayOfMonth.date()};
          this.arr.push(this.b);
        } else {
          if (dayOfMonth.date() == daysInMonth) {
            this.b = {weekDay: dayOfMonth.format('dd'), day: dayOfMonth.date()};
            this.arr.push(this.b);
            this.arrWeeks.push(this.arr);
            console.log(this.arrWeeks);  ///////////////////
            return this.arrWeeks;
          }
        }
      }
      this.arrWeeks.push(this.arr);
      this.arr = [];
    }
  }

  myaction($event: any) {
    console.log($event.value);
  }

  changeCurrentDay(input: any) {
    console.log(input);
    // return this.currentDay = moment(input, 'YYYY-MM')
  }

  changeCurrentYear(input: string) {
    // this.ngRedux.select('currentDate')
    // let newDate = this.currentDay.year(input);
    // console.log(newDate);
    this.ngRedux.dispatch({type: 'SET_YEAR', year: input});
    // this.currentDay = moment(input, 'YYYY');
    // console.log(this.currentDay);

    // return this.currentDay
  }
}

interface IMonth {
    weekDay: string;
    day: number;
}
