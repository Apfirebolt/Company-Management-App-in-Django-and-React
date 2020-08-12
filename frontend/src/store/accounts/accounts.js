import * as accountTypes from './accountTypes';
import { updateObject } from '../utility';

const initialState = {
  token: localStorage.getItem("Token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case accountTypes.USER_LOADING:
      return updateObject(state, {isLoading: true});
    case accountTypes.USER_LOADED:
      return updateObject(state, {isAuthenticated: true, isLoading: false, user: action.payload});
    case accountTypes.LOGIN_SUCCESS:
      localStorage.setItem("Token", action.val);
      return updateObject(state, {isAuthenticated: true, isLoading: false});
    case accountTypes.AUTH_ERROR:
    case accountTypes.LOGIN_FAIL:
    case accountTypes.LOGOUT_SUCCESS:
    case accountTypes.REGISTER_FAIL:
      localStorage.removeItem("Token");
      return updateObject(state, {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      });

    default:
      return state;
  }
};

export default reducer;