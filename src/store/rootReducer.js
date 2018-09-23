import { combineReducers } from 'redux';
import orders from './bookReducer';

const rootReducer = combineReducers({
  orders,
});

const CryptoApp = (state, action) => {
  return rootReducer(state, action);
};

export default CryptoApp;
