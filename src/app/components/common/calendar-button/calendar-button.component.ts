import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: '[calendarButton]',
  templateUrl: './calendar-button.component.html',
})
export class CalendarButtonComponent implements OnInit {
  @Input() day: moment.Moment;
  @Input() currentDay: moment.Moment;
  @Input() monthStatistics: any[];
  @Output() click = new EventEmitter<moment.Moment>();
  // @Input() projects: any;
  private statistic: any;

  ngOnInit() {
    this.statistic = this.monthStatistics.filter(data => data.day == this.day.date() && this.checkClass())[0];
  }

  private checkClass() {
    if (!this.day || !this.currentDay) {
      return false
    }
    return this.day.format('MM') == this.currentDay.format('MM')
  }

  private clickHandler() {
    this.click.emit(this.day);
  }
}
