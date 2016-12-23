import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Router } from "@angular/router";
import { AppState } from './app.state';

import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";
import { BootstrapProgress } from "./models/bootstrap/bootstrap-progress";
import { AppErrorService } from "./services/app-error.service";
import { AppError } from "./models/app-error";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private currentUser: User;

  constructor(private ngRedux: NgRedux<AppState>, private router: Router, private errorService: AppErrorService) {}

  ngOnInit() {
    console.log("APP_COMPONENT#ON_INIT");

    this.ngRedux.select('currentUser').subscribe((user: User) => this.currentUser = user);

    this.ngRedux.select('bootstrapItems').forEach((items: BootstrapItem[]) => {
      let bootstrapProgress = new BootstrapProgress(items);
      let rehydratedProgress = items.filter(i => { return i.name == "redux-store-rehydrated" })[0];
      let userProgress = items.filter(i => { return i.name == "load-user" })[0];

      if (!userProgress.isLoading() && rehydratedProgress.isLoaded()) {
        if (this.currentUser) {
          this.router.navigate(['/teams', this.currentUser.teamId]);
        } else {
          let error = new AppError(400, "please login from Slack application");
          this.ngRedux.dispatch({ type: 'SET_APP_ERROR', appError: error});
        }
      }

      if (bootstrapProgress.isCompleted()) {
        window.document.dispatchEvent(new Event('application-bootstrap-done'));
      }
    });

    this.ngRedux.select('appError').forEach((error: AppError) => {
      if (error) {
        this.errorService.handleError(error);
      }
    });
  }
}
