import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { CurrentUserActions } from "../../actions/current-user.actions";
import { User } from "../user";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private userActions: CurrentUserActions) {}

  ngOnInit() {
    let pid = this.activateRoute.snapshot.queryParams['pid'];
    this.authService.getToken(pid).subscribe(response => this.setUser(response))
  }

  private setUser(response) {
      let jwt = response.data.jwt;
      if (jwt) {
          let user = new User(jwt);
          this.userActions.setUser(user);
          // TODO: redirect to home page (teams user page)
      } else {
          // TODO: show user auth errors page (please login with Slack etc.)
          console.log("Errors:", response.errors)
      }

  }

}
