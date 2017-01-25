import { Routes, RouterModule }   from '@angular/router';

import { ActivateComponent } from "./components/users/activate/activate.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { ErrorsComponent } from "./components/errors/errors.component";
import { AppComponent } from "./app.component";

const APP_ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'activate_user', component: ActivateComponent },
  { path: 'teams/:name', component: TeamsComponent },
  { path: 'errors/:status', component: ErrorsComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
