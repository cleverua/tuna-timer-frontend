import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable()
export class DatesService {
  // private arrDaysInMonth: moment.Moment[][];

  constructor() {}

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
      /*Create first not full week-report                             */
      for (let j = 1; j <= daysInFirstWeek; j++) {
        let dayOfMonth = inputMoment.date(j);
        daysArray.push(moment(dayOfMonth));
      }
      arrayOfWeeks.push(daysArray);
      daysArray = [];
    }
    /* Other part of month with not full week-report in the end    */
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

  getTilesForCalendar(input: any) {
    /* First Week    */
    let tilesArray = input.slice();
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
}
