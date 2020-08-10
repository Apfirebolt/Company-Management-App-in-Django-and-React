import * as actionTypes from './accountTypes';
import { updateObject } from '../utility';

const initialState = {
  info_data: null
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, {info_data: action.val});
    default:
      return state;
  }
};

export default reducer;