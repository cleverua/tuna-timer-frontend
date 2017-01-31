import { REHYDRATE } from 'redux-persist/constants';


export function projectsReducer (state = 'wewewe', action: any) {
  switch (action.type) {
    case 'SET_PROJECTS_FOR_MONTH':
      // let pro = this.apiService.getProjects();
      console.log("dssssssssssssssssssssssssssssssssssssssssssssssss");
    case 'SET_PROJECT':

      // let newYear = state.clone();
      // newYear.year(action.year);
      // return checkDate(newYear);

    default:
      return state;
  }
}
