import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Router } from '@angular/router';

import { AppState } from "../../app.state";
import { User } from "../../models/user";
import { ApiService } from "../../services/api.service";
import {AppError} from "../../models/app-error";

@Component({
  selector: 'app-team',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.css']
})
export class TeamsComponent implements OnInit {
  currentUser: User;

  constructor(private ngRedux: NgRedux<AppState>, private router: Router, private authService: ApiService) { }

  ngOnInit() {
    console.log("TEAMS_COMPONENT#OnInit");

    this.ngRedux.select('currentUser').forEach((user: User) => {
      this.currentUser = user;

      if (this.currentUser) {
        this.authService.getTasks(this.currentUser.jwt).subscribe(
          resp => {
            //TODO place Timers to the store, dispatch bootstrap tasks completed
            console.log("TASKS:", resp);
            this.ngRedux.dispatch({ type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-user'});
          },
          err  => {
            this.ngRedux.dispatch({ type: 'SET_APP_ERROR', appError: err});
          }
        );
      }
    });
  }
}
