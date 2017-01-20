import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgModel } from "@angular/forms";

import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { User } from "../../models/user";
import { Timer } from "../../models/timer";
import { TimersService } from "../../services/timers.service";

import * as moment from "moment"

@Component({
  selector: 'app-timer-form',
  templateUrl: './timer-form.component.html'
})
export class TimerFormComponent implements OnInit, OnDestroy {
  @Input() timer: Timer;
  @Input() projects: [any];
  @Input() currentUser: User;
  private subscription: Subscription;
  private fetchPeriod: number = 10000;

  constructor(private timersService: TimersService) { }

  ngOnInit() {
    if (!this.timer.finished_at) {
      let timer = TimerObservable.create(this.fetchPeriod, this.fetchPeriod);
      this.subscription = timer.subscribe();

      this.subscription = timer.subscribe(() => {
        if (!document.hidden) this.timersService.updateTimers()
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription)  this.subscription.unsubscribe();
  }

  startStopClickHandler() {
    if (this.timer.finished_at) {
      this.timersService.createTimer(this.timer)
    } else {
      this.timersService.stopTimer(this.timer)
    }
  }

  updateTaskNameHandler(input: NgModel = null) {
    this.timersService.allowUpdate();
    if (input.pristine || input.invalid) return;
    this.timersService.updateTimer(this.timer);
  }

  selectProjectHandler(name: string) {
    let project = this.projects.find(p => {return p.ext_name === name});
    this.timer.project_ext_id = project.ext_id;
    this.timer.project_id = project.id;

    this.timersService.updateTimer(this.timer);
    this.timersService.allowUpdate();
  }

  updateMinutesHandler(input: HTMLInputElement) {
    let initialValue = input.getAttribute("ng-reflect-value");
    let regex = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");

    if (regex.test(input.value) && initialValue != input.value) {
      let editTime = moment.duration(input.value).asMinutes() - this.timer.minutes;
      this.timer.edits.push({created_at: new(Date), team_user_id: this.currentUser.id, minutes: editTime});
      this.timer.minutes = this.timer.minutes + editTime;

      this.timersService.updateTimer(this.timer);
    } else {
      input.value = initialValue;
    }

    this.timersService.allowUpdate();
  }

  deleteClickHandler(){
    this.timersService.deleteTimer(this.timer);
  };

  disableTimersUpdate() {
    this.timersService.disableUpdate();
  }
}
