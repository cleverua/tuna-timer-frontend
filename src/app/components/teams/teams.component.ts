import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Router } from '@angular/router';

import { AppState } from "../../app.state";
import { User } from "../../models/user";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-team',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.css']
})
export class TeamsComponent implements OnInit {
  currentUser: User;

  constructor(private ngRedux: NgRedux<AppState>, private router: Router, private authService: AuthenticationService,) { }

  ngOnInit() {
    console.log("TEAMS_COMPONENT#OnInit");
    //TODO load Users tasks after validation

    this.ngRedux.select('currentUser').forEach((user: User) => {
      this.currentUser = user;

      if (this.currentUser) {
        this.authService.validateToken(this.currentUser.jwt).subscribe(response => {
          this.ngRedux.dispatch({ type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-user'});
        },
          err  => this.router.navigate(['/errors', err]));
      }
    });
  }
}
