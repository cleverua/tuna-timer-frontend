import { Component, OnInit, Input } from '@angular/core';
import { Timer } from "../../models/timer";

@Component({
  selector: 'app-timer-form',
  templateUrl: './timer-form.component.html'
})
export class TimerFormComponent implements OnInit {
  @Input() timer: Timer;

  constructor() { }

  ngOnInit() {
  }

}
