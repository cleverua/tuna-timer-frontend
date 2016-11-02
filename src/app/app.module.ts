import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { createStore } from 'redux';

import { AppState } from './app.state';
import { AppComponent } from './app.component';
import { rootReducer } from './store/index';

import { ApiService } from './services/api.service';
import { PersistenceService } from './services/persistence.service';
import { CurrentUserActions } from './actions/current-user.actions';
import { ArticlesActions } from './actions/articles.actions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [
    PersistenceService,
    ApiService,
    CurrentUserActions,
    ArticlesActions
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
