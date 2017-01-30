import { Routes, RouterModule }   from '@angular/router';

import { ActivateComponent } from "./components/users/activate/activate.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { ErrorsComponent } from "./components/errors/errors.component";
import { AppComponent } from "./app.component";
import { DayReportComponent } from "./components/day-report/day-report.component";
import { WeekReportComponent } from "./components/week-report/week-report.component";


const APP_ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'activate_user', component: ActivateComponent },
  { path: 'teams/:name', component: TeamsComponent,
    children: [
                { path: '', redirectTo: 'day-report', pathMatch: 'full' },
                { path: 'day-report', component: DayReportComponent},
                { path: 'week-report', component: WeekReportComponent }
              ] },
  { path: 'errors/:status', component: ErrorsComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
