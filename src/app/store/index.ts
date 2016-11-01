import { combineReducers } from 'redux';

import { articlesReducer } from './articles.reducer';
import { currentUserReducer } from './current-user.reducer';

import { AppState } from '../app.state';

export const rootReducer = combineReducers<AppState>({
    currentUser: currentUserReducer,
    articles: articlesReducer
});
