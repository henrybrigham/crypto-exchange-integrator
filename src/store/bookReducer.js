import { updateObject, createReducer } from './utilities';
import { 
	GET_BOOK_ORDERS_REQUEST, GET_BOOK_ORDERS_SUCCESS, GET_BOOK_ORDERS_FAILURE 
} from './bookActions';
const initialState = {
	bookOrders: {},
	isFetching: false,
	error: false
}

// export function orders(state = initialState, action){
//   switch (action.type) {
// 	case 'orders:FETCH_ORDERS_REQUEST':
// 	return {
// 		bookOrders: state.bookOrders,
// 		isFetching: true,
// 		error: false
// 	};
//   case 'orders:FETCH_ORDERS_SUCCESS':
//     return {
// 			bookOrders: action.payload,
// 			isFetching: false,
// 			error: false
//     };
// 	case 'orders:FETCH_ORDERS_FAILURE':
// 		return {
// 			bookOrders: state.bookOrders,
// 			isFetching: false,
// 			error: true
// 		};
//   default: return state;
//   }
// }

const actionHandlers = {
  [GET_BOOK_ORDERS_REQUEST]: state =>{
		console.log('reducer');
    return updateObject(state, {
      bookOrders: state.bookOrders,
			isFetching: true,
			error: false
    });
},
  [GET_BOOK_ORDERS_SUCCESS]: (state, action) =>
    updateObject(state, {
      bookOrders: action.payload,
			isFetching: false,
			error: false
    }),

  [GET_BOOK_ORDERS_FAILURE]: (state, action) =>
    updateObject(state, {
      bookOrders: state.bookOrders,
			isFetching: false,
			error: true
    }),
};

export default createReducer(initialState, actionHandlers);