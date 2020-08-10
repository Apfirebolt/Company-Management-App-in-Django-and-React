import * as actionTypes from './infoTypes';
import { updateObject } from '../utility';

const initialState = {
  info_data: null
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_INFO:
      console.log('Inside main reducer function now ', action.val);
      return updateObject(state, {info_data: action.val});
    default:
      return state;
  }
};

export default reducer;