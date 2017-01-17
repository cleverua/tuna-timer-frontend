import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minToHours'
})
export class MinToHoursPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let hours = value / 60 | 0;
    let minutes = value % 60 | 0;

    if (minutes < 10) {
      return `${hours}:0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

}
