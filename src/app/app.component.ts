import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from './app.state';
import { ActivatedRoute } from "@angular/router";

import { UserActions } from './actions/user.actions';
import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";
import { BootstrapProgress } from "./models/bootstrap/bootstrap-progress";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  usersList: User[];

  constructor(
    private ngRedux: NgRedux<AppState>,
    private userActions: UserActions,
    private activateRoute: ActivatedRoute,
    private authService: AuthenticationService,
    ) {}

  ngOnInit() {
    console.log("APP COMPONENT#OnInit");

    this.ngRedux.select('bootstrapItems').forEach(b => {
      let items = (b as BootstrapItem[]);
      let bootstrapProgress = new BootstrapProgress(items);
      let rehydrated = items.filter(i => { return i.name == "redux-store-rehydrated" })[0];

      if (rehydrated.isLoaded()) {
        let params = this.activateRoute.snapshot.queryParams;
        let pid = params['pid'];
        let team = params['teamID'];

        this.ngRedux.select('usersList').forEach(s => this.usersList = ((s as User[])));
        let existedUser = this.usersList.filter(user => { return user.teamId == team })[0];

        if (existedUser) {
          this.userActions.setCurrentUser(existedUser.jwt);
          console.log("User Exist")
          //TODO validate JWT token, if not valid - destroy local storage
        } else if (pid) {
          this.authService.getToken(pid).subscribe(response => this.setUserByPid(response));
        }

        this.ngRedux.select('currentUser').forEach(s => this.currentUser = ((s as User)));
      }

      if (bootstrapProgress.isCompleted()) {
        window.document.dispatchEvent(new Event('application-bootstrap-done'));
      }
    });
  }

  private setUserByPid(response) {
    let jwt: string = response.data.jwt;
    if (jwt) {
      this.userActions.setCurrentUser(jwt);
      this.userActions.addNewUser(jwt);
      // TODO: redirect to home page (teams user page)
    } else {
      // TODO: show user auth errors page (please login with Slack etc.)
      console.log("Errors:", response.errors)
    }
  }

  userChange(name) {
    console.log(name)
    let user = this.usersList.filter(u => {return u.name == name})[0];
    this.userActions.setCurrentUser(user.jwt);
  }

  private getTasks() {
    console.log("APP_COMPONENT#ON_INIT#GET_Tasks")
  }
}
