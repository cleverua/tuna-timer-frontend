import { combineReducers } from 'redux';

import { AppState } from '../app.state';
import { articlesReducer } from './articles.reducer';
import { currentUserReducer } from './current-user.reducer';
import { usersListReducer } from './users-list.reducer';
import { bootstrapItemsReducer } from "./bootstrap-items.reducer";
import { appErrorReducer } from "./app-error.reducer";

export const rootReducer = combineReducers<AppState>({
    currentUser: currentUserReducer,
    articles: articlesReducer,
    usersList: usersListReducer,
    bootstrapItems: bootstrapItemsReducer,
    appError: appErrorReducer
});
