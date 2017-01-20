import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import * as moment from 'moment';

import { NgRedux } from "ng2-redux";
import { AppState } from "../../app.state";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  private currentDay; today: moment.Moment;
  private monthsArray: string[] = moment.monthsShort();
  private arrDaysInMonth: moment.Moment[][];
  private arrayForTilesOfMonth: moment.Moment[][];
  private subscription: Subscription;

  constructor(private ngRedux: NgRedux<AppState>) {}

  ngOnInit() {
    this.ngRedux.dispatch({type: 'SET_CURRENT_DAY'});
    this.today = moment();
    this.subscription = this.ngRedux.select('currentDate').subscribe((currentDay: moment.Moment) => {
      this.currentDay = currentDay;
      this.arrDaysInMonth = this.getMonthDays(this.currentDay.format('YYYY-MM'));
      this.arrayForTilesOfMonth = this.getTilesForCalendar();
    });

    // if (this.currentDay) {
    //   this.arrDaysInMonth = this.getMonthDays(this.currentDay.format('YYYY-MM'));
    // }
    // this.arrayForTilesOfMonth = this.getTilesForCalendar();
  }

  getMonthDays(input: string) {
    let inputMoment = moment(input, 'YYYY-MM');
    let firstDay = inputMoment.date(1).isoWeekday();
    let daysInFirstWeek = 8 - firstDay;
    let daysInMonth = inputMoment.daysInMonth();
    let fullWeek = 0;
    let arrayOfWeeks = [];
    let daysArray = [];

    /*Condition if month not start with Monday               */
    if (firstDay) {
      /*Create first not full week                             */
      for (let j = 1; j <= daysInFirstWeek; j++) {
        let dayOfMonth = inputMoment.date(j);
        daysArray.push(moment(dayOfMonth));
      }
      arrayOfWeeks.push(daysArray);
      daysArray = [];
    }
    /* Other part of month with not full week in the end    */
    for (fullWeek; fullWeek < ( daysInMonth - daysInFirstWeek ) / 7; fullWeek++) {
      for (let j = 1; j <= 7; j++) {
        let dayOfMonth = inputMoment.date(j + daysInFirstWeek + fullWeek * 7);
        if (dayOfMonth.date() < daysInMonth ) {
          daysArray.push(moment(dayOfMonth));
        } else {
          if (dayOfMonth.date() == daysInMonth) {
            daysArray.push(moment(dayOfMonth));
            arrayOfWeeks.push(daysArray);
            console.log(arrayOfWeeks);  ///////////////////
            return arrayOfWeeks;
          }
        }
      }
      arrayOfWeeks.push(daysArray);
      daysArray = [];
    }
  }

  getTilesForCalendar() {
    /* First Week    */
    let tilesArray = this.arrDaysInMonth.slice();
    let firstWeekArray = tilesArray[0];
    let firstDay = tilesArray[0][0];
    let daysArray = firstWeekArray.slice();
    if (firstWeekArray.length < 7) {
      for (let i = -1; i > firstWeekArray.length - 8; i--) {
        let dayOfWeek = moment(firstDay).add(i, 'days');
        daysArray.unshift(dayOfWeek);
      }
      tilesArray[0] = daysArray;
    }
    /* Last Week    */
    let lastWeekArray = tilesArray[tilesArray.length - 1];
    let lastDay = lastWeekArray[lastWeekArray.length -1];
    daysArray = lastWeekArray.slice();
    if (lastWeekArray.length < 7) {
      for (let i = 1; i < 8 - lastWeekArray.length; i++) {
        let dayOfWeek = moment(lastDay).add(i, 'days');
        daysArray.push(dayOfWeek);
      }
      tilesArray[tilesArray.length - 1] = daysArray;
    }
    return tilesArray
  }

  changeDate(input: string) {
    this.ngRedux.dispatch({type: 'SET_DATE', date: input});
  }

  changeMonth(input: number) {
    this.ngRedux.dispatch({type: 'SET_MONTH', month: input});
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
}
