import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // private currentDay = moment();
  public previousYear: number = moment().year() ;
  public currentMonth: number = moment().month();
  private monthArray: any = moment.monthsShort();

  constructor() {
    // this.previousYear = this.currentDay.year() - 1;
    // this.currentMonth = this.currentDay.month();
  }

  ngOnInit() {
  }

  // showMonth(val: number) {
  //   return this.monthName = new Date(2, val, )
  // }
}
