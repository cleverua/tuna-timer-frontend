import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from './app.state';
import { ArticlesState } from './store/articles.reducer';
import { CurrentUserActions } from './actions/current-user.actions';
import { ArticlesActions } from './actions/articles.actions';
import { User } from "./users/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  articles: ArticlesState;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private userActions: CurrentUserActions,
    private articlesActions: ArticlesActions) {}

  ngOnInit() {
    console.log("APP COMPONENT#OnInit")
    // this.ngRedux.select('currentUser').forEach(s => this.currentUser = ((s as User)));
    // this.ngRedux.select('articles').forEach(s => this.articles = ((s as ArticlesState)));

    // TODO: dispatch next event only after data gathering (current user data, user tasks)
    window.document.dispatchEvent(new Event('application-bootstrap-done'));
  }

  fetchArticles() {
    console.log('AppComponent#fetchArticles clicked');
    this.articlesActions.fetch();
  }
}
