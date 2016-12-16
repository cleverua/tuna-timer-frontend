import { Injectable, NgZone } from '@angular/core';

import { Store } from 'redux';
import { Persistor, persistStore } from 'redux-persist';

import { AppState } from '../app.state';

@Injectable()
export class PersistenceService {

  private persistor: Persistor;

  constructor(private ngZone: NgZone) {}

  bootstrap(reduxStore: Store<AppState>) {
    console.log('Bootstrapping PersistenceService');
    this.persistor = persistStore(reduxStore, { blacklist: ['bootstrapItems']}, () => {
      console.log('The initial state load completed!');
      this.ngZone.run(() => reduxStore.dispatch({ type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'redux-store-rehydrated' }));
    });
  }

  purge() {
    console.log('PersistenceService#purge: ', this.persistor);
    this.persistor.purge(undefined);
  }
}
