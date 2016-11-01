import { Component, OnInit } from '@angular/core';

import { NgRedux } from 'ng2-redux';

import { AppState } from './app.state';
import { CurrentUserState } from './store/current-user.reducer';
import { ArticlesState } from './store/articles.reducer';
import { CurrentUserActions } from './actions/current-user.actions';
import { ArticlesActions } from './actions/articles.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: CurrentUserState;
  articles: ArticlesState;

  constructor(private ngRedux: NgRedux<AppState>,
    private userActions: CurrentUserActions,
    private articlesActions: ArticlesActions) {}

  ngOnInit() {
    this.ngRedux.select('currentUser').forEach(s => this.currentUser = ((s as CurrentUserState)));
    this.ngRedux.select('articles').forEach(s => this.articles = ((s as ArticlesState)));
  }

  setUserTimezone() {
    console.log('AppComponent#setUserTimezone clicked');
    this.userActions.setTimezone('Kiev: ' + Math.random());
  }

  fetchArticles() {
    console.log('AppComponent#fetchArticles clicked');
    this.articlesActions.fetch();
  }

}
