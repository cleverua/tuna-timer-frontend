import { REHYDRATE } from 'redux-persist/constants';
import { Project } from "../models/project";

export function projectsReducer (state: Project[] = null, action: any) {
  switch (action.type) {
    case 'SET_PROJECTS_FOR_MONTH':
      let pro = action.projects;
      return pro;
    // case 'SET_PROJECT':
      // let newYear = state.clone();
      // newYear.year(action.year);
      // return
    default:
      return state;
  }
}
