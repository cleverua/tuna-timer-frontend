import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private currentDay = moment(); // custom for tests '16-1', 'YY-MM'
  private monthArray: string[] = moment.monthsShort();
  arr : IMonth[];
  b: IMonth;
  arrWeeks:  IMonth[][];
  private arrDaysInMonth: any;

  constructor() {
    this.arrWeeks = [];
    this.arr = [];
    this.arrDaysInMonth = [];
    this.arrDaysInMonth = this.getMonthDays(this.currentDay.format('YYYY-MM'));
  }

  ngOnInit() {
  }

  getMonthDays(input: string) {
    let inputMoment = moment(input, 'YYYY-MM');
    let firstDay = inputMoment.date(1).isoWeekday();
    let daysInFirstWeek = 8 - firstDay;
    let daysInMonth = inputMoment.daysInMonth();
    let fullWeek = 0;

    console.log(daysInMonth);

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
            console.log(this.arrWeeks);
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
}

interface IMonth {
    weekDay: string;
    day: number;
}
