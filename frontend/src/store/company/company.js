import * as companyTypes from './companyTypes';
import { updateObject } from '../utility';

const initialState = {
  companies: null,
  company_detail: null
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case companyTypes.LIST_COMPANY:
      return updateObject(state, {companies: action.val});
    case companyTypes.DETAIL_COMPANY:
      return updateObject(state, {company_detail: action.val});
    default:
      return state;
  }
};

export default reducer;