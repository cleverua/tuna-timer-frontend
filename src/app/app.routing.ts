import { Routes, RouterModule }   from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component"
import { HomeComponent } from "./home/home.component";
import { ActivateComponent } from "./components/users/activate/activate.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { ErrorsComponent } from "./components/errors/errors.component";

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activate_user', component: ActivateComponent },
  { path: 'teams/:id', component: TeamsComponent },
  { path: 'errors', component: ErrorsComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
