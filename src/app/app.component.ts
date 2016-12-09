import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from './app.state';
import { ArticlesState } from './store/articles.reducer';
import { UserActions } from './actions/user.actions';
import { ArticlesActions } from './actions/articles.actions';
import { User } from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  articles: ArticlesState;
  usersList: User[];

  constructor(
    private ngRedux: NgRedux<AppState>,
    private userActions: UserActions,
    private articlesActions: ArticlesActions) {}

  ngOnInit() {
    console.log("APP COMPONENT#OnInit")
    this.ngRedux.select('currentUser').forEach(s => this.currentUser = ((s as User)));
    this.ngRedux.select('usersList').forEach(s => this.usersList = ((s as User[])));

    // TODO: dispatch next event only after data gathering (current user data, user tasks)
    window.document.dispatchEvent(new Event('application-bootstrap-done'));
  }

  fetchArticles() {
    console.log('AppComponent#fetchArticles clicked');
    this.articlesActions.fetch();
  }
}
