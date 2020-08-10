import infoReducer from './info/info';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  info: infoReducer,
});

export default rootReducer;

