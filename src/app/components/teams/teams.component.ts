import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Router } from '@angular/router';

import { AppState } from "../../app.state";
import { User } from "../../models/user";
import { ApiService } from "../../services/api.service";
import { Timer } from "../../models/timer";

@Component({
  selector: 'app-team',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.css']
})
export class TeamsComponent implements OnInit {
  private currentUser: User;
  private timers: Timer[];

  constructor(private ngRedux: NgRedux<AppState>, private router: Router, private authService: ApiService) { }

  ngOnInit() {
    console.log("TEAMS_COMPONENT#OnInit");
    this.ngRedux.select('timers').subscribe((timers: Timer[]) => this.timers = timers);

    this.ngRedux.select('currentUser').subscribe((user: User) => {
      this.currentUser = user;

      if (this.currentUser) {
        this.authService.getTasks(this.currentUser.jwt).subscribe(
          data => {
            let timers: Timer[] = data.map(t => { return new Timer(t) });

            this.ngRedux.dispatch({ type: 'SET_TIMERS', timers: timers});
            this.ngRedux.dispatch({ type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-user'});
            this.ngRedux.dispatch({ type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-tasks'});
          },
          err  => {
            this.ngRedux.dispatch({ type: 'SET_APP_ERROR', appError: err});
          }
        );
      }
    });
  }
}
