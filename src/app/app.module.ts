import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { createStore } from 'redux';
import { MomentModule } from 'angular2-moment';
import { Autosize } from 'angular2-autosize/angular2-autosize';

import { AppState } from './app.state';
import { AppComponent } from './app.component';
import { rootReducer } from './store/root.reducer';

import { ApiService } from './services/api.service';
import { TimersService } from './services/timers.service';
import { PersistenceService } from './services/persistence.service';
import { UserActions } from './actions/user.actions';

import { routing } from "./app.routing";

import { ActivateComponent } from './components/users/activate/activate.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { AppErrorService } from "./services/app-error.service";
import { TimerFormComponent } from './components/timer-form/timer-form.component';
import { MinToHoursPipe } from './pipes/min-to-hours.pipe';
import { DatesService } from "./services/dates.service";
import { DropdownComponent } from './components/common/dropdown/dropdown.component';
import {DayReportComponent} from "./components/day-report/day-report.component";
import {WeekReportComponent} from "./components/week-report/week-report.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CalendarButtonComponent } from './components/common/calendar-button/calendar-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivateComponent,
    TeamsComponent,
    ErrorsComponent,
    TimerFormComponent,
    Autosize,
    MinToHoursPipe,
    DropdownComponent,
    DayReportComponent,
    WeekReportComponent,
    SidebarComponent,
    CalendarButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule.forRoot(),
    routing,
    MomentModule
  ],
  providers: [
    PersistenceService,
    ApiService,
    UserActions,
    AppErrorService,
    TimersService,
    DatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>, persistenceService: PersistenceService) {
    const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
    ngRedux.provideStore(store);
    persistenceService.bootstrap(store);
  }
}
