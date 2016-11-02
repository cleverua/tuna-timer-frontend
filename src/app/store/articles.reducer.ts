import { REHYDRATE } from 'redux-persist/constants';

import { ArticlesActions } from '../actions/articles.actions';

export class ArticlesState {
    public fetchStatus: string = 'never-fetched';
    public fetchedAt: Date;
    public data: string;
}

const initialState = new ArticlesState();

export function articlesReducer(state: ArticlesState = initialState, action: any) {
  switch (action.type) {
    case REHYDRATE:
      console.log('articlesReducer#REHYDRATE');
      let incoming = action.payload.articles;
      return incoming ? Object.assign({}, incoming) : state;
    case ArticlesActions.ARTICLES_FETCHING:
      console.log('articlesReducer#ARTICLES_FETCHING');
      return Object.assign( {}, state, { fetchStatus: 'in-progress' } );
    case ArticlesActions.ARTICLES_FETCHED:
      console.log('articlesReducer#ARTICLES_FETCHED');
      return Object.assign( {}, state, { fetchStatus: 'competed', data: action.payload.data, fetchedAt: new Date() } );
    case ArticlesActions.ARTICLES_FETCH_FAILURE:
      console.log('articlesReducer#ARTICLES_FETCH_FAILURE');
      return Object.assign( {}, state, { fetchStatus: 'failed', fetchedAt: new Date()} );
    default:
      return state;
  }
}
