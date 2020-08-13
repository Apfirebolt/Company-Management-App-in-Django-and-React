import infoReducer from './info/info';
import companyReducer from './company/company';
import accountsReducer from './accounts/accounts';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  info: infoReducer,
  accounts: accountsReducer,
  company: companyReducer
});

export default rootReducer;





