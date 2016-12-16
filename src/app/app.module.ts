import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { createStore } from 'redux';

import { AppState } from './app.state';
import { AppComponent } from './app.component';
import { rootReducer } from './store/root.reducer';

import { ApiService } from './services/api.service';
import { PersistenceService } from './services/persistence.service';
import { AuthenticationService } from './services/authentication.service';
import { UserActions } from './actions/user.actions';
import { ArticlesActions } from './actions/articles.actions';

import { routing } from "./app.routing";

import { HomeComponent } from './home/home.component';
import { ActivateComponent } from './components/users/activate/activate.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { AppErrorService } from "./services/app-error.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivateComponent,
    TeamsComponent,
    ErrorsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule.forRoot(),
    routing
  ],
  providers: [
    PersistenceService,
    ApiService,
    AuthenticationService,
    UserActions,
    ArticlesActions,
    AppErrorService
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
