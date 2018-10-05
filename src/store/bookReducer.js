import { updateObject, createReducer } from './utilities';
import { 
	GET_BOOK_ORDERS_REQUEST, GET_BOOK_ORDERS_SUCCESS, GET_BOOK_ORDERS_FAILURE 
} from './bookActions';

const initialState = {
	bookOrders: {},
	isFetching: false,
	error: false
}

const actionHandlers = {
  [GET_BOOK_ORDERS_REQUEST]: state =>
    updateObject(state, {
      bookOrders: state.bookOrders,
			isFetching: true,
			error: false
    }),
  [GET_BOOK_ORDERS_SUCCESS]: (state, action) =>
    updateObject(state, {
      bookOrders: action.payload,
			isFetching: false,
			error: false
    }),

  [GET_BOOK_ORDERS_FAILURE]: state =>
    updateObject(state, {
      bookOrders: state.bookOrders,
			isFetching: false,
			error: true
    }),
};

export default createReducer(initialState, actionHandlers);