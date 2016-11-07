import { Routes, RouterModule }   from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component"
import { HomeComponent } from "./home/home.component";
import { ActivateComponent } from "./users/activate/activate.component";

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activate_user', component: ActivateComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
