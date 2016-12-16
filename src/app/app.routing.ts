import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { ActivateComponent } from "./components/users/activate/activate.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { ErrorsComponent } from "./components/errors/errors.component";

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'activate_user', component: ActivateComponent },
  { path: 'teams/:id', component: TeamsComponent },
  { path: 'errors/:status', component: ErrorsComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
