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
  private projects: any;
  private totalScore: number;

  constructor(private ngRedux: NgRedux<AppState>, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    console.log("TEAMS_COMPONENT#OnInit");
    this.ngRedux.select('timers').subscribe((timers: Timer[]) => {
      this.timers = timers;
      this.getTotal(timers);
    });

    this.ngRedux.select('currentUser').subscribe((user: User) => {
      this.currentUser = user;
      if (this.currentUser) this.fetchCurrentUserData();
    });
  }

  private getTotal(timers) {
    if (timers && timers[0]){
      let total = timers.reduce((sum, next) => {
        let minutes = sum.getMinutes() + next.getMinutes();
        return new Timer({minutes: minutes, finished_at: new Date()})
      });
      this.totalScore = total.minutes;
    }
  }

  private fetchCurrentUserData() {
    this.apiService.getTasks(this.currentUser.jwt).subscribe(
      resp => {
        let timersData: Timer[] = resp.data || [];
        let timers = timersData.map(t => { return new Timer(t) });

        this.ngRedux.dispatch({type: 'SET_TIMERS', timers: timers});
        this.ngRedux.dispatch({type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-user'});
        this.ngRedux.dispatch({type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-tasks'});
      },
      err  => {
        this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: err});
      }
    );

    this.apiService.getProjects(this.currentUser.jwt).subscribe(
      resp => {
        //TODO put projects to store(if we need that)
        this.projects = resp.data;
        this.ngRedux.dispatch({type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-projects'});
      },
      err  => {
        this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: err});
      });
  }
}
