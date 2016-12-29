import { BootstrapItem } from "../models/bootstrap/bootstrap-item";

const initialState = [
  new BootstrapItem('redux-store-rehydrated'),
  new BootstrapItem('load-user'),
  new BootstrapItem('load-tasks'),
  new BootstrapItem('load-projects'),
];

export function bootstrapItemsReducer(state: BootstrapItem[] = initialState, action: any) {
  switch (action.type) {
    case 'BOOTSTRAP_ITEM_COMPLETED':
      console.log('bootstrapItemsReducer#BOOTSTRAP_ITEM_COMPLETED', action.itemName);
      for (let i = 0; i < state.length; i++) {
        let item: BootstrapItem = state[i];
        if (item.getName() === action.itemName) {
          let replacement = new BootstrapItem(action.itemName);
          replacement.setLoaded();
          return [...state.slice(0, i), replacement, ...state.slice(i + 1)];
        }
      }
      return state;
    case 'BOOTSTRAP_ITEM_LOADING':
      //TODO refactor duplicated code
      console.log('bootstrapItemsReducer#BOOTSTRAP_ITEM_LOADING', action.itemName);
      for (let i = 0; i < state.length; i++) {
        let item: BootstrapItem = state[i];
        if (item.getName() === action.itemName) {
          let replacement = new BootstrapItem(action.itemName);
          replacement.setLoading();
          return [...state.slice(0, i), replacement, ...state.slice(i + 1)];
        }
      }
      return state;
    default:
      return state;
  }
}
