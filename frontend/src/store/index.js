import infoReducer from './info/info';
import accountsReducer from './accounts/accounts';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  info: infoReducer,
  accounts: accountsReducer
});

export default rootReducer;

