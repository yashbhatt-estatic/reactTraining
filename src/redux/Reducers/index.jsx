import { combineReducers } from 'redux';
import userReducer from './userReducer';
import commonReducer from './commonReducer';

const reducer = combineReducers({
  userReducer,
  commonReducer,
});

export default reducer;
