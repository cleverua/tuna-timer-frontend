import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from "ng2-redux";
import { Router, ActivatedRoute } from '@angular/router';

import { AppState } from "../../../app.state";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserActions } from "../../../actions/user.actions";
import { BootstrapItem } from "../../../models/bootstrap/bootstrap-item";
import { User } from "../../../models/user";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-activate',
  templateUrl: 'activate.component.html',
  styleUrls: ['activate.component.css']
})
export class ActivateComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private userActions: UserActions) {}

  ngOnInit() {
    this.subscription = this.ngRedux.select(state=>state.bootstrapItems.filter(i => i.name == "redux-store-rehydrated")[0])
      .subscribe((rehydrated: BootstrapItem) => {
        if (rehydrated.isLoaded()) {
          let pid = this.activateRoute.snapshot.queryParams['pid'];
          this.authService.getToken(pid).subscribe(response => this.setUserByPid(response));
        }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private setUserByPid(response) {
    let jwt: string = response.data.jwt;
    if (jwt) {
      let user = new User(jwt);
      this.userActions.setCurrentUser(user);
      this.router.navigate(['/teams', user.teamId]);
    } else {
      console.log("Errors:", response.errors);
      this.router.navigate(['/errors', 400]);
    }
  }
}
