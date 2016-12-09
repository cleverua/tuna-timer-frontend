import { REHYDRATE } from 'redux-persist/constants';
import { User } from "../models/user";
import { UserActions } from "../actions/user.actions";

const initialState = [];

export function usersListReducer(state: User[] = initialState, action: any) {
  switch (action.type) {
    case REHYDRATE:
      console.log('UsersListReducer#REHYDRATE userList');
      let users = action.payload.usersList;
      console.log(action);
      return users ? users : state;
    case UserActions.ADD_NEW_USER:
      console.log('UsersListReducer#ADD_NEW_USER');
      return addNewUser(state, action);
    default:
      return state;
  }
}

function addNewUser(state: User[] = initialState, action: any): User[] {
  let newUser: User = action.payload.user;
  let userExist: boolean = state.some( user => { return user.id === newUser.id });

  if (userExist) {
    return state
  } else {
    let newState: User[] = state.map(user => { return Object.assign({}, user) });
    newState.push(newUser);
    return newState
  }
}
