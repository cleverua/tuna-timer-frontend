import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { AppState } from '../app.state';
import { ApiService } from '../services/api.service';

@Injectable()
export class ArticlesActions {

    static ARTICLES_FETCHING: string = 'FETCHING_ARTICLES';
    static ARTICLES_FETCHED: string = 'FETCHED_ARTICLES';
    static ARTICLES_FETCH_FAILURE: string = 'FAILED_FETCH_ARTICLES';

    constructor(private ngRedux: NgRedux<AppState>, private api: ApiService) {}

    fetch() {
        console.log('ArticlesActions#fetch');
        this.ngRedux.dispatch( {type: ArticlesActions.ARTICLES_FETCHING} );

        this.api.fetchArticles().subscribe(
            data => this.ngRedux.dispatch( {type: ArticlesActions.ARTICLES_FETCHED, payload: {data: data}}),
            error => this.ngRedux.dispatch( {type: ArticlesActions.ARTICLES_FETCH_FAILURE, payload: {data: error}})
        );
    }
}
